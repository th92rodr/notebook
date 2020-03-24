// Verify if the current user is authenticated and
// save the result in the request.
// This value is going to be checked in the controllers,
// since some routes require authentication and others don't.
require('dotenv').config();
const jwt = require('jsonwebtoken');

function isNotAuthenticated(req, next) {
  req.isAuthenticated = false;
  return next();
}

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) return isNotAuthenticated(req, next);

  // Expected format - Authentication Header = Bearer 'token'
  const parts = authHeader.split(' ');
  if (!parts.length === 2) return isNotAuthenticated(req, next);

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return isNotAuthenticated(req, next);
  if (!token || token === '') return isNotAuthenticated(req, next);

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SALT);
  } catch (error) {
    return isNotAuthenticated(req, next);
  }

  if (!decodedToken) return isNotAuthenticated(req, next);

  console.log('decodedToken ', decodedToken);

  req.isAuthenticated = true;
  req.userId = decodedToken.id;
  req.token = token;
  return next();
};
