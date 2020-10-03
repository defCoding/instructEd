const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./queries');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.post('/users', db.createUser);
app.post('/authenticate', db.loginUser);

app.listen(process.env.PORT || 5000);
console.log(`Server started. Listening on port ${process.env.PORT || 5000}`);
