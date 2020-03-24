const { cacheRedis } = require('../redis/');
const { getAsync } = require('../utils/redisQuery');

async function cache(req, res, next) {
  const { userId } = req.params;
  console.log('cache');

  try {
    const data = await getAsync(cacheRedis, userId);
    console.log('data ', data);
    return res.status(200).json({ notes: data });
  } catch (error) {
    return next();
  }
}

module.exports = cache;
