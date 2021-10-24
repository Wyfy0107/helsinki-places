import Redis from 'ioredis'
import dotenv from 'dotenv'

import app from './app'

dotenv.config()

const redisPort = Number(process.env.REDIS_PORT || 6379)
const redisHost = process.env.ENDPOINT || 'localhost'

export const client = new Redis({
  port: redisPort,
  host: redisHost,
})

client.on('error', err => {
  console.log('redis client error', err)
})

client.on('connect', () => {
  console.log('connected to elasticache cluster')
})

app.listen(process.env.PORT || 5000)
