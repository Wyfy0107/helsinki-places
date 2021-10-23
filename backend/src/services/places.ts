import axios from 'axios'

import { InternalServerError } from '../util/error'
import { Place, PlacesResponse } from '../types'
import { ElastiCacheClient } from '@aws-sdk/client-elasticache'
import redis from 'redis'
import Redis from 'ioredis'

// const client = new ElastiCacheClient({ region: 'eu-north-1' })

const client = new Redis({
  port: 6379,
  host: 'cluster-example.kbg6d4.0001.eun1.cache.amazonaws.com',
})

client.on('error', err => {
  console.log('redis client error', err)
})

const getAll = async (
  page?: number,
  limit?: number
): Promise<PlacesResponse> => {
  try {
    if (page && limit) {
      const cacheKey = `${page}-${limit}`
      const cache = await client.get(cacheKey)

      if (cache) {
        return JSON.parse(cache)
      }

      const {
        data: { data, meta },
      } = await axios.get<PlacesResponse>(
        `https://open-api.myhelsinki.fi/v1/places/?language_filter=en&start=${page}&limit=${limit}`
      )

      const response = {
        meta: {
          ...meta,
          page,
          limit,
        },
        data,
      }
      await client.set(cacheKey, JSON.stringify(response))
      return response
    }

    const cacheAll = await client.get('all')
    if (cacheAll) {
      return JSON.parse(cacheAll)
    }

    const {
      data: { data, meta },
    } = await axios.get<PlacesResponse>(
      'https://open-api.myhelsinki.fi/v1/places/?language_filter=en'
    )

    const response = {
      meta: { ...meta, page: null, limit: null },
      data,
    }
    await client.set('all', JSON.stringify(response))
    return response
  } catch (error) {
    throw new InternalServerError()
  }
}

const getById = async (id: string) => {
  try {
    const result = await axios.get<Place>(
      `https://open-api.myhelsinki.fi/v1/place/${id}`
    )

    return result.data
  } catch (error) {
    throw new InternalServerError()
  }
}

export default {
  getAll,
  getById,
}
