const redisClient =
  require("../config/redis");

exports.get = async (key) => {
  return redisClient.get(key);
};

exports.set = async (
  key,
  value
) => {

  await redisClient.set(
    key,
    JSON.stringify(value),
    {
      EX: 3600
    }
  );
};