const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const path = require('path');
const Duo = require('@duosecurity/duo_web');
const app = express();
const db = require('./queries');
const { withAuth, withDuoAuth } = require('./middleware');

passport.use(new Strategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
    }));

// Serve static file of index.html to allow Router to initialize.
const serveIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '../react-ui/build/index.html'), err => {
	  if (err) {
		  res.status(500).send(err);
		}
	});
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/users', db.createUser);
app.post('/authenticate', db.loginUser);

app.post('/authenticate/facebook', passport.authenticate('facebook', { failureRedirect: `${process.env.FRONTEND_HOST}/error` }), 
  (req, res) => {
    console.log('Callback success.');
  });

app.post('/forgotPassword', db.forgotPassword);
app.post('/updatePassword', db.updatePassword);
app.get('/resetPassword/:token', db.resetPassword, serveIndex);
app.get('/dashboard', withDuoAuth);

app.get('/duo_frame', withAuth, (req, res) => {
  const sigRequest = Duo.sign_request(process.env.DUO_IKEY, process.env.DUO_SKEY, process.env.DUO_AKEY, req.userID);
  res.json({sigRequest, host: process.env.DUO_HOST});
});

app.post('/duo_login', withAuth, (req, res) => {
  const signedResponse = req.body.signedResponse;
  const authenticatedUsername = Duo.verify_response(process.env.DUO_IKEY,
    process.env.DUO_SKEY,
    process.env.DUO_AKEY,
    signedResponse);

  if (authenticatedUsername) {
    const userID = req.userID;
    const token = jwt.sign({ userID }, process.env.DUO_JWT_KEY);
    res.cookie('DUO_TOKEN', token, { httpOnly: true }).status(200).send();
  } else {
    res.status(403).send('Duo login failed.');
  }
});

// Catch All
app.use(express.static(path.join(__dirname, '../react-ui/build')));
app.get('*', serveIndex);


app.listen(process.env.PORT || 5000);
console.log(`Server started. Listening on port ${process.env.PORT || 5000}`);
