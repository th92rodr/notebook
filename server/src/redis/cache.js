const redis = require('redis');

const redisClient = redis
  .createClient(process.env.CACHE_REDIS_URL)
  .on('connect', () => {
    console.log('Redis Cache client connected');
  })
  .on('error', error => {
    console.log('Redis Cache not connected', error);
  });

module.exports = redisClient;
