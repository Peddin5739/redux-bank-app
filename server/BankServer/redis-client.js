const Redis = require("ioredis");

const redisClient = new Redis({
  host: "redis-session-store.bdvu76.clustercfg.use2.cache.amazonaws.com:6379",
  port: 6379,
  // Additional options if needed
});

// Set a value in Redis
redisClient
  .set("Name", "Naveen@2628")
  .then(() => {
    console.log("Value set successfully");
  })
  .catch((err) => {
    console.error("Error setting value", err);
  });

// Get a value from Redis
redisClientcd
  .get("Name")
  .then((value) => {
    console.log("Value:", value); // Prints the value of 'my_key'
  })
  .catch((err) => {
    console.error("Error getting value", err);
  });
