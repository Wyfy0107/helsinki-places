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
  username: 'wyfy',
  password: 'nguyenduy01071998',
})

client.on('error', err => {
  console.log('redis client error', err)
})

const getAll = async (
  page?: number,
  limit?: number
): Promise<PlacesResponse> => {
  try {
    const {
      data: { data, meta },
    } = await axios.get<PlacesResponse>(
      'https://open-api.myhelsinki.fi/v1/places/?language_filter=en'
    )

    if (page && limit) {
      const {
        data: { data, meta },
      } = await axios.get<PlacesResponse>(
        `https://open-api.myhelsinki.fi/v1/places/?language_filter=en&start=${page}&limit=${limit}`
      )

      return {
        meta: {
          ...meta,
          page,
          limit,
        },
        data,
      }
    }

    return {
      meta: { ...meta, page: null, limit: null },
      data,
    }
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
