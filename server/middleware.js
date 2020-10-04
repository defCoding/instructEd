const jwt = require('jsonwebtoken');
const db = require('./queries');

// Used only for verifying login before going to DuoLogin.
const withAuth = (req, res, next) => {
  const token = req.cookies.LOGIN_TOKEN;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided.');
  } else {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token.');
      } else {
        req.userID = decoded.userID;
        next();
      }
    });
  }
};

// Used for verifying DuoLogin
const withDuoAuth = (req, res, next) => {
  const token = req.cookies.DUO_TOKEN;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided.');
  } else {
    jwt.verify(token, process.env.DUO_JWT_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token.');
      } else {
        req.userID = decoded.userID;
        next();
      }
    });
  }
}

// next() in this context is the DuoLogin.
const verifyUsernamePassword = (req, res, next) => {
  db.loginUser(req, res);
  switch (res.status) {
    case 200:
      next();
      break;
    case 400:
      res.send('Something went wrong.');
      break;
    case 403:
      res.send('Invalid email or password.');
      break;
    default:
      res.send('Something went really wrong.');
      break;
  }
};

module.exports = {
  withAuth,
  withDuoAuth,
  verifyUsernamePassword
};
