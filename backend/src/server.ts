import Redis from 'ioredis'
import dotenv from 'dotenv'

import app from './app'

dotenv.config()

const isTestEnv = process.env.NODE_ENV === 'test'

let redisPort = Number(process.env.REDIS_PORT as string)
let redisHost = process.env.ENDPOINT as string

if (isTestEnv) {
  redisPort = 6379
  redisHost = 'redis'
}

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
