const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const db = require('./queries');
const { withAuth } = require('./middleware');

// Set up Facebook OAuth Login
/*
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/facebook/callback',
  profileFields: ['id', 'displayName', 'email', 'name', 'photos'],
  passReqToCallBack: true
},
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    return cb(null, profile);
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/facebook', passport.authenticate('facebook'));
app.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: `${process.env.FRONTEND_HOST}/error` }), 
  (req, res) => {
    console.log('Callback success.');
    res.send(`${process.env.FRONTEND_HOST}/success`);
  });
  */

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
app.post('/forgotPassword', db.forgotPassword);
app.post('/updatePassword', db.updatePassword);
app.get('/resetPassword/:token', db.resetPassword, serveIndex);
app.get('/dashboard', withAuth, (req, res) => {
  res.send('HI');
});

// Catch All
app.use(express.static(path.join(__dirname, '../react-ui/build')));
app.get('*', serveIndex);


app.listen(process.env.PORT || 5000);
console.log(`Server started. Listening on port ${process.env.PORT || 5000}`);
