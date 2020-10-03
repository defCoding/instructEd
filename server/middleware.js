const jwt = require('jsonwebtoken');

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

module.exports = {
  withAuth
};
