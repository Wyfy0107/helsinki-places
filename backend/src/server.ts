import redis from 'redis'
import Redis from 'ioredis'
import dotenv from 'dotenv'

import app from './app'

dotenv.config()

export const client = new Redis({
  port: Number(process.env.PORT as string),
  host: process.env.ENDPOINT as string,
})

client.on('error', err => {
  console.log('redis client error', err)
})

client.on('connect', () => {
  console.log('connected to elasticache cluster')
})

app.listen(process.env.PORT || 5000)
