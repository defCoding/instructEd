const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'kevin',
  password: '12345',
  database: 'instructED_1'
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

//app.listen(process.env.PORT);
app.listen(8080);
