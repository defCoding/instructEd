const { Client } = require('pg');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto-random-string');
const moment = require('moment');

require('dotenv').config();


const resetExpirationAmount = 15;
const resetExpirationUnit = 'minutes';

/*
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
*/

const client = new Client({
  host: 'localhost',
  database: 'demo', user: 'demo'
});


client.connect(() => {
  console.log("Connected to database.");
});

/**
 * Login and Registration Queries
 */

const createUser = ((req, res) => {
  const info = req.body;

  const sql = "INSERT INTO Users VALUES(default, default, $1, $2, $3, crypt($4, gen_salt('bf')), false);";
  const values = [info.email, info.firstName, info.lastName, info.password];

  client.query(sql, values, (err, result) => {
    if (err) {
      res.status(409).send('Email has already been taken by another account.');
    } else {
      res.status(201).send('User created!');
    }
  });
});

const createLoginToken = (userID) => {
  const payload = { userID };
  const token = jwt.sign(payload, process.env.JWT_KEY);
  return token;
}

const loginUser = ((req, res) => {
  const info = req.body;

  let sql = "SELECT id FROM Users WHERE email=$1 AND oauth!=true AND password=crypt($2, password);";
  let values = [info.email, info.password];

  client.query(sql, values, (err, result) => {
    if (err) {
      res.status(400).send('Something went wrong.');
    } else if (!result.rows.length) {
      sql = "SELECT * FROM Users WHERE email=$1 AND oauth=true";
      values = [info.email];
			client.query(sql, values, (err, result) => {
				if (err) {
          res.status(400).send('Something went wrong.');
        } else if (!result.rows.length) {
          res.status(401).send('Invalid email or password.');
        } else {
          res.status(403).send('This account was created via Facebook.');
        }
      });
    } else {
      // Issue authorization token.
      const token = createLoginToken(result.rows[0].id);
      res.cookie('LOGIN_TOKEN', {expires: Date.now()});
      res.cookie('LOGIN_TOKEN', token, { httpOnly: true }).status(200).send('Token sent!');
    }
  });
});

const loginFacebook = (req, res) => {
  const info = req.body;

  let sql = "SELECT id FROM Users WHERE email=$1 AND oauth=true;";
  let values = [info.email];

  client.query(sql, values, (err, result) => {
    if (err) {
      res.status(400).send('Something went wrong.');
    } else if (!result.rows.length) {
      sql = "INSERT INTO Users VALUES(default, default, $1, $2, '', '', true) RETURNING id;";
      values = [info.email, info.name];
      client.query(sql, values, (err, result) => {
        if (err) {
          res.status(400).send('Something went wrong.');
        } else {
          const token = createLoginToken(result.rows[0].id);
          res.cookie('LOGIN_TOKEN', {expires: Date.now()});
          res.cookie('LOGIN_TOKEN', token, { httpOnly: true }).status(201).send('Facebook account added.');
        }
      });
    } else {
      const token = createLoginToken(result.rows[0].id);
      res.cookie('LOGIN_TOKEN', {expires: Date.now()});
      res.cookie('LOGIN_TOKEN', token, { httpOnly: true }).status(200).send('Facebook login accepted.');
    }
  })
}

const forgotPassword = ((req, res) => {
  const info = req.body;

  let sql = "SELECT id FROM Users WHERE email=$1 AND oauth!=true;";
  const values = [info.email];

  client.query(sql, values, async (err, result) => {
    if (err) {
      res.status(400).send('Something went wrong.');
    } else if (!result.rows.length) {
      sql = "SELECT id FROM Users WHERE email=$1 AND oauth=true;";
      client.query(sql, values, (err, result) => {
        if (err) {
          res.status(400).send('Something went wrong.');
        } else if (!result.rows.length) {
          res.status(404).send('This email is not associated with an account.');
        } else {
          res.status(422).send('This account was created via Facebook.');
        }
      });
    } else {
      const id = result.rows[0]['id'];
      token = await createPasswordResetToken(id);

      if (token === -1) {
        res.status(400).send('Something went wrong.');
      } else {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`
          }
        });

        const mailOptions = {
          from: `${process.env.EMAIL_ADDRESS}`,
          to: `${info.email}`,
          subject: '[InstructED] Reset Password Link',
          text:
          'You are receiving this email because you (or someone else) have requested a password reset for your InstructED account.\n\n'
          + `Please click on the following link, or paste this into your browser to complete the process within ${resetExpirationAmount} ${resetExpirationUnit} of receiving it:\n\n`
          + `http://instructed.herokuapp.com/resetPassword/${token}\n\n`
          + 'If you did not make this request, please ignore this email and your credentials will remain unchanged.\n'
        }

        transporter.sendMail(mailOptions, (error, response) => {
          if (error) {
            res.status(500).send('Something went wrong with sending the email.');
          } else {
            res.status(200).send('Recovery email sent.');
          }
        });
      }
    }
  });
});

const createPasswordResetToken = async (id) => {
  const token = crypto({length: 40, type: 'url-safe'});
  const expiration = moment(Date.now()).add(resetExpirationAmount, resetExpirationUnit).format('YYYY-MM-DD HH:mm:ss');

  let sql = "INSERT INTO PasswordTokens VALUES($1, $2, $3)";
  const values = [id, token, expiration];

  const result = await client.query(sql, values)
    .then(result => {
      return token;
    })
    .catch(async (err) => {
      sql = 'UPDATE PasswordTokens SET token=$2, expiration=$3 WHERE id=$1;';
      return await client.query(sql, values)
        .then(result => {
          return token;
        })
        .catch(err => {
          return -1;
        });
    });

  return result;
};

const resetPassword = async (req, res, next) => {
  const token = req.params.token;

  const expirationCode = await checkResetExpiration(token);
  res.status(expirationCode);
  next();
};

const checkResetExpiration = async (token) => {
  const sql = 'SELECT expiration FROM PasswordTokens WHERE token=$1;';
  const values = [token];

  return await client.query(sql, values)
    .then(result => {
      if (!result.rows.length) {
        return 401;
      } else {
        const row = result.rows[0];
        const expiration = moment(row['expiration']).utc();
        const now = moment(Date.now()).utc();

        if (now.isAfter(expiration)) {
          return 408;
        } else {
          return 200;
        }
      }
    }).catch(err => {
      return 400;
    });
};

const updatePassword = async (req, res) => {
  const token = req.body.token;
  const password = req.body.password;

  const expirationCode = await checkResetExpiration(token);

  if (expirationCode === 200) {
    let sql = 'SELECT id FROM PasswordTokens WHERE token=$1;';
    let values = [token];

    client.query(sql, values, (err, result) => {
      if (err) {
        res.status(400).send('Something went wrong.');
      } else {
        if (!result.rows.length) {
          res.status(401).send();
        } else {
          const id = result.rows[0]['id'];
          sql = "UPDATE Users SET password=crypt($1, gen_salt('bf')) WHERE id=$2;";
          values = [password, id];

          client.query(sql, values, (err, result) => {
            if (err) {
              res.status(400).send('Something went wrong.');
            } else {
              res.status(201).send();
            }
          });
        }
      }
    });
  } else {
    res.status(expirationCode).send();
  }
};


const getRole = (req, res) => {
  const id = req.userID;

  const sql = 'SELECT main_role FROM Users WHERE id=$1;';
  const values = [id];

  client.query(sql, values, (err, result) => {
    if (err) {
      res.status(400).send('Something went wrong.');
    } else {
      if (!result.rows.length) {
        res.status(400).send('Something went wrong.');
      } else {
        res.status(200).send(result.rows[0]['main_role']);
      }
    }
  });
}

/**
 * Courses, Assignments, and Announcements
 */

const getAllCourses = (role) => (req, res) => {
  let filter;
  switch (role) {
    case 'student':
      filter = ' INNER JOIN Enrollments on Courses.course_id=Enrollments.course_id WHERE Enrollments.user_id=$1;';
      break;
    case 'instructor':
      filter = ' INNER JOIN Instructing on Courses.course_id=Instructing.course_id WHERE Instructing.user_id=$1;';
      break;
    case 'admin':
      filter = '';
      break;
    default: 
      throw new Error('Invalid role.')
  }

  const sql = `SELECT * FROM Courses${filter};`;
  const values = [req.userID];

  client.query(sql, values, (err, result) => {
    if (err) {
      res.status(400).send('Something went wrong.');
    } else {
      res.status(200).send(result.rows);
    }
  });
}

const getAllAnnouncements = (role) => (req, res) => {
  let filter;
  switch (role) {
    case 'student':
      filter = ' INNER JOIN Enrollments on AC.course_id=Enrollments.course_id WHERE Enrollments.user_id=$1;';
      break;
    case 'instructor':
      filter = ' INNER JOIN Instructing on AC.course_id=Instructing.course_id WHERE Instructing.user_id=$1;';
      break;
    case 'admin':
      filter = '';
      break;
    default: 
      throw new Error('Invalid role.')
  }
  
  const sql = `SELECT * FROM
    (SELECT Announcements.*, Courses.course_name FROM
      Announcements INNER JOIN Courses
      ON Announcements.course_id=Courses.course_id)
    AS AC${filter};`
  const values = [req.userID];

  client.query(sql, values, (err, result) => {
    if(err) {
      res.status(400).send('Something went wrong.');
    } else {
      res.status(200).send(result.rows);
    }
  })
}

const getAllAssignments = (role) => (req, res) => {
  let filter;
  switch (role) {
    case 'student':
      filter = ' INNER JOIN Enrollments on AC.course_id=Enrollments.course_id WHERE Enrollments.user_id=$1;';
      break;
    case 'instructor':
      filter = ' INNER JOIN Instructing on AC.course_id=Instructing.course_id WHERE Instructing.user_id=$1;';
      break;
    case 'admin':
      filter = '';
      break;
    default:
      throw new Error('Invalid role.')
  }

  const sql = `SELECT * FROM
  (SELECT Assignments.*, Courses.course_name FROM
    Assignments INNER JOIN Courses
    ON Assignments.course_id=Courses.course_id)
   AS AC${filter};`;
  const values = [req.userID];

  client.query(sql, values, (err, result) => {
    if (err) {
      res.status(400).send('Something went wrong.');
    } else {
      res.status(200).send(result.rows);
    }
  });
}

const getAssignment = (req, res) => {
  let assignmentID = req.params.ID;
  const userID = req.userID;

  if (!isNaN(assignmentID)) {
    assignmentID = parseInt(assignmentID);
    if (userCanAccessAssignment(userID, assignmentID)) {
      const sql = `SELECT * FROM Assignments WHERE assignment_id=$1`;
      const values = [assignmentID];
      client.query(sql, values, (err, result) => {
        if (err) {
          res.status(400).send('Something went wrong.');
        } else if (!result.rows.length) {
          res.status(404).send('Assignment not found.');
        } else {
          res.status(200).send(results.rows[0]);
        }
      })
    } else {
      res.status(403).send('Access denied.')
    }
  } else {
    res.status(404).send('Assignment not found.');
  }
}

/**
 * Checks that a user with a given userID can view the provided assignment ID.
 * @param {uuid} userID 
 * @param {integer} assignmentID 
 * @return {boolean} True if the user can access the assignment, false otherwise.
 */
const userCanAccessAssignment = (userID, assignmentID) => {
  // First check if user is an admin.
  const role = queryForRole(userID);
  if (role == 'admin') {
    return true;
  } else {
    // Check instructors table first to see if the user is associated with the course.
    let tables = ['Instructing', 'Enrollments'];
    const values = [userID, assignmentID];

    for (let i = 0; i < tables.length; i++) {
      const sql = `SELECT * FROM
      (SELECT assignment_id, course_id FROM
        Assignments WHERE
        assignment_id=$2) AS A
      INNER JOIN ${tables[i]}
      ON A.course_id=${tables[i]}.course_ID
      WHERE
      ${tables[i]}.user_id=$1;`;

      let found = client.query(sql, values, (err, result) => {
        if (err || !result.rows.length) {
          return false;
        } else {
          return true;
        }
      });

      if (found) {
        return true;
      }
    }
  }
}

/**
 * Gets the role of the user with the given userID.
 * @param {uuid} userID 
 * @return {String} The role of the user.
 */
const queryForRole = (userID) => {
  const sql = 'SELECT main_role FROM Users WHERE id=$1;';
  const values = [userID];

  client.query(sql, values, (err, result) => {
    if (err) {
      return '';
    } else {
      if (!result.rows.length) {
        return '';
      } else {
        return result.rows[0]['main_role'];
      }
    }
  });
}

const getCourseAnnouncements = (req, res) => {
  const sql = `SELECT Announcements.*, U.first_name, U.last_name FROM
  Announcements
  INNER JOIN
  (SELECT id, first_name, last_name FROM Users) as U
  ON Announcements.author_id=U.id
  WHERE Announcements.course_id=$1;`
  const values = [req.params.ID];

  client.query(sql, values, (err, result) => {
    if (err) {
      res.status(400).send('Something went wrong.');
    } else {
      res.status(200).send(result.rows);
    }
  });
}

const getCourseAssignments = (req, res) => {
  const sql = 'SELECT * FROM Assignments WHERE Assignments.course_id=$1;'
  const values = [req.params.ID];

  client.query(sql, values, (err, result) => {
    if (err) {
      res.status(400).send('Something went wrong.');
    } else {
      res.status(200).send(result.rows);
    }
  });
}

const addAnnouncement = (req, res) => {
  const info = req.body;
  const userID = req.userID;
  const creationDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  const sql = `INSERT INTO Announcements VALUES
    (default, $1, $2, $3, $4, $5);`;
  const values = [info.announcementName, info.description, info.courseID, creationDate, userID];

  client.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send('Something went wrong.');
    } else {
      console.log(result);
      res.status(201).send('Announcement successfully created.');
    }
  });
}

module.exports = {
  createUser,
  loginUser,
  loginFacebook,
  forgotPassword,
  resetPassword,
  updatePassword,
  getRole,
  getAllCourses,
  getAllAnnouncements,
  getAllAssignments,
  getCourseAssignments,
  getCourseAnnouncements,
  getAssignment,
  addAnnouncement
};
