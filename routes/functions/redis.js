// const Redis = require('ioredis');

// async function executeRedis(query,args) {
//   try {
//       const redis = new Redis("redis://:U8haIOYA9qNXSpbF37CMnY7cXjOWoyzf@redis-16023.c212.ap-south-1-1.ec2.cloud.redislabs.com:16023");
//       const results = await redis.call(query,args);
//       await redis.quit();
//   } catch (error) {
//       return { error };
//   }
// }

// module.exports = executeRedis