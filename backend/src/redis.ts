import Redis from 'ioredis'

export const client = new Redis({
  port: Number(process.env.REDIS_PORT as string),
  host: process.env.ENDPOINT as string,
})

client.on('error', err => {
  console.log('redis client error', err)
})

client.on('connect', () => {
  console.log('connected to elasticache cluster')
})
