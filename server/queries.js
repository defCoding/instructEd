const { Client } = require('pg');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto-random-string');
const moment = require('moment');

require('dotenv').config();


const resetExpirationAmount = 15;
const resetExpirationUnit = 'minutes';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/*
const client = new Client({
  host: 'localhost',
  database: 'demo', user: 'demo'
});
*/


client.connect(() => {
  console.log("Connected to database.");
});

const createUser = ((req, res) => {
  const info = req.body;
 
  const sql = "INSERT INTO Users VALUES(default, $1, $2, $3, crypt($4, gen_salt('bf')), false);";
  const values = [info.email, info.firstName, info.lastName, info.password];

  client.query(sql, values, (err, result) => {
    console.log(result);
    if (err) {
      res.status(409).send('Email has already been taken by another account.');
    } else {
      res.status(200).send('User created!');
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
  const values = [info.email, info.password];

  client.query(sql, values, (err, result) => {
    if (err) {
      res.status(400).send('Something went wrong.');
    } else if (!result.rows.length) {
			sql = "SELECT oauth FROM Users WHERE email=$1 AND oauth=true";
			client.query(sql, values, (err, result) => {
				if (err) {
          res.status(400).send('Something went wrong.');
        } else if (!result.rows.length) {
          res.status(401).send('Invalid email or password.');
        } else {
          res.status(407).send('This account was created via Facebook.');
        }
      });
    } else {
      // Issue authorization token.
      const token = createLoginToken(result.rows[0].id);
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
      sql = "INSERT INTO Users VALUES(default, $1, $2, '', '', true) RETURNING id;";
      values = [info.email, info.name];
      client.query(sql, values, (err, result) => {
        if (err) {
          res.status(400).send('Something went wrong.');
        } else {
          console.log(result);
          const token = createLoginToken(result.rows[0].id);
          res.cookie('LOGIN_TOKEN', token, { httpOnly: true }).status(200).send('Facebook account added.');
        }
      });
    } else {
      const token = createLoginToken(result.rows[0].id);
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
      sql = "SELECT id FROM Users WHERE email=$1 AND oauth==true;";

      client.query(sql, values, (err, result) => {
        if (err) {
          res.status(400).send('Something went wrong.');
        } else if (!result.rows.length) {
          res.status(401).send('This email is not associated with an account.');
        } else {
          res.status(407).send('This account was created via Facebook.');
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
            res.status(400).send('Something went wrong with sending the email.');
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
          res.status(401).send('Could not find user.');
        } else {
          const id = result.rows[0]['id'];
          sql = "UPDATE Users SET password=crypt($1, gen_salt('bf')) WHERE id=$2;";
          values = [password, id];

          client.query(sql, values, (err, result) => {
            if (err) {
              res.status(400).send('Something went wrong.');
            }
          });
        }
      }
    });
  } else {
    res.status(expirationCode).send();
  }
};


module.exports = {
  createUser,
  loginUser,
  loginFacebook,
  forgotPassword,
  resetPassword,
  updatePassword
};
