const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const db = require('./queries');
const { withAuth } = require('./middleware');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.post('/users', db.createUser);
app.post('/authenticate', db.loginUser);
app.get('/dashboard', withAuth, (req, res) => {
  res.send('HI');
});

app.listen(process.env.PORT || 5000);
console.log(`Server started. Listening on port ${process.env.PORT || 5000}`);
