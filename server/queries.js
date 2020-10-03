const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/*
const client = new Client({
  host: 'localhost',
  database: 'demo',
  user: 'demo'
});
*/


client.connect(() => {
  console.log("Connected to database.");
});

const createUser = ((req, res) => {
  const info = req.body;
 
  const sql = "INSERT INTO Users VALUES(default, $1, $2, $3, crypt($4, gen_salt('bf')), null);"
  const values = [info.email, info.firstName, info.lastName, info.password];

  client.query(sql, values, (err, result) => {
    if (err) {
      res.status(409).send('Email has already been taken by another account.');
    } else {
      console.log(result);
      res.send(``);
    }
  });
});

const loginUser = ((req, res) => {
  const info = req.body;

  const sql = "SELECT * FROM Users WHERE email=$1 AND password=crypt($2, password);"
  const values = [info.email, info.password]

  client.query(sql, values, (err, result) => {
    if (err) {
      res.status(400).send('Something went wrong.');
    } else if (!result.rows.length) {
      res.status(403).send('Incorrect email or password.');
    } else {
      res.send('Logged in!');
    }
  });
});


module.exports = {
  createUser,
  loginUser
};
