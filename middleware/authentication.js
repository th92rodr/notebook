require('dotenv').config();
const jwt = require('jsonwebtoken');

function isNotAuthenticated(req, next) {
  req.isAuthenticated = false;
  return next();
}

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('authorization ', authHeader);
  if (!authHeader) return isNotAuthenticated(req, next);

  // Authentication Header = Bearer 'token'
  const parts = authHeader.split(' ');
  console.log('parts ', parts);
  if (!parts.length === 2) return isNotAuthenticated(req, next);

  const [ scheme, token ] = parts;
  console.log('token ', token);
  console.log('scheme ', scheme);
  if (!/^Bearer$/i.test(scheme)) return isNotAuthenticated(req, next);
  if (!token || token === '') return isNotAuthenticated(req, next);

  console.log('token ', token);

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SALT);
  } catch (error) {
    console.log('error ', error);
    return isNotAuthenticated(req, next);
  }
  console.log('decodedToken ', decodedToken);

  if (!decodedToken) return isNotAuthenticated(req, next);

  req.isAuthenticated = true;
  req.userId = decodedToken.userId;
  return next();
};
