import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
});

export const cacheData = async (key: string, data: any, ttl: number = 3600) => {
  await redis.setex(key, ttl, JSON.stringify(data));
};

export const getCachedData = async (key: string) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};