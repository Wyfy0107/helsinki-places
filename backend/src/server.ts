import Redis from 'ioredis'
import dotenv from 'dotenv'

import app from './app'

dotenv.config()

console.log('port env', process.env.REDIS_PORT)
const redisPort = Number(process.env.REDIS_PORT || 6379)
console.log('redis port', redisPort)
const redisHost = process.env.ENDPOINT || 'localhost'
console.log('host env', process.env.ENDPOINT)
console.log('redis host', redisHost)

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
