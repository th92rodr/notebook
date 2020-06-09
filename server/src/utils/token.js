const { authControlRedis } = require('../redis/');
const { getAsync } = require('./redisQuery');

async function checkTokenValidation(user, token) {
  try {
    const data = await getAsync(authControlRedis, user);

    if (token !== data.token) {
      throw Error;
    }

    const currentDate = new Date();
    const expirationDate = new Date(data.expiration);

    if (currentDate > expirationDate) {
      throw Error;
    }
  } catch (error) {
    return {
      isValid: false,
      errorMessage: 'Invalid token'
    };
  }

  return {
    isValid: true
  };
}

module.exports = {
  checkTokenValidation
};
