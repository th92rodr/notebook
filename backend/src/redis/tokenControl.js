const redis = require('redis');

const redisClient = redis
  .createClient(process.env.AUTH_REDIS_URL)
  .on('connect', () => {
    console.log('Redis client connected');
  })
  .on('error', (error) => {
    console.log('Redis not connected', error);
  });

module.exports = redisClient;
