const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/users', db.createUser);

app.listen(process.env.PORT || 3000);
