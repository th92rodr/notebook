const { cacheRedis } = require('../redis/');

async function cache(req, res, next) {
  const { userId } = req.params;
  console.log('cache');

  try {
    const data = await getAsync(userId);
    console.log('data ', data);
    return res.status(200).json({ notes: data });
  } catch (error) {
    return next();
  }
}

function getAsync(key) {
  return new Promise(function(resolve, reject) {
    cacheRedis.get(key, (error, data) => {
      if (error) reject(error);
      if (data === null) reject();

      resolve(JSON.parse(data));
    });
  });
}

module.exports = cache;
