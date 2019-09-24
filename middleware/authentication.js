require('dotenv').config();
const jwt = require('jsonwebtoken');

function isNotAuthenticated() {
    req.isAuthenticated = false;
    return next();
}

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return isNotAuthenticated();

    // Authentication Header = Bearer 'token'
    const parts = authHeader.split(' ');
    if (!parts.length === 2) return isNotAuthenticated();

    const { scheme, token } = parts;
    if (!/^Bearer$/i.test(scheme)) return isNotAuthenticated();
    if (!token || token === '' ) return isNotAuthenticated();

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SALT);
    } catch (error) {
        return isNotAuthenticated();
    }

    if (!decodedToken) return isNotAuthenticated();

    req.isAuthenticated = true;
    req.userId = decodedToken.userId;
    return next();
};