function getAsync(redisClient, key) {
  return new Promise(function(resolve, reject) {
    redisClient.get(key, (error, data) => {
      if (error) reject(error);
      if (data === null) reject();

      resolve(JSON.parse(data));
    });
  });
}

function setAsync(redisClient, key, value) {
  return new Promise(function(resolve, reject) {
    redisClient.set(key, value, error => {
      if (error) reject(error);
      resolve();
    });
  });
}

module.exports = {
  getAsync,
  setAsync
};
