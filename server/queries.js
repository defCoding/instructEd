const { Client } = require('pg');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
      res.send('User created!');
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
      // Issue authorization token.
      const userID = result.rows[0]['id'];
      const payload = { userID };
      const token = jwt.sign(payload, process.env.JWT_KEY);
      res.cookie('LOGIN_TOKEN', token, { httpOnly: true }).status(200).send('Token sent!');
    }
  });
});


module.exports = {
  createUser,
  loginUser
};
