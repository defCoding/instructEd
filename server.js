const mysql = require('mysql');
console.log(process.env.DATABASE_URL);
console.log(process.env.DATABASE_PASSWORD);

const connection = mysql.createConnection({
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

connection.connect();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/', (req, res) => {
  const info = req.body;
  connection.query(`insert into users values('${info.userName}', '${info.email}', '${info.password}', '', '');`, (err) => {
    console.log(err);
  });
});

app.listen(process.env.PORT || 3000);
