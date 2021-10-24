import Redis from 'ioredis'
import dotenv from 'dotenv'

import app from './app'

dotenv.config()

const isTestEnv = process.env.NODE_ENV === 'test'

console.log('port env', process.env.REDIS_PORT)
let redisPort = Number(process.env.REDIS_PORT as string)
console.log('redis port', redisPort)
let redisHost = process.env.ENDPOINT as string
console.log('host env', process.env.ENDPOINT)
console.log('redis host', redisHost)

if (isTestEnv) {
  redisPort = 6379
  redisHost = 'localhost'
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
