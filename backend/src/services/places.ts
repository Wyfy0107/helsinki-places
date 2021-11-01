import axios from 'axios'

import { InternalServerError } from '../util/error'
import { Place, PlacesResponse } from '../types'
import { client } from '../redis'

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
  const cacheKey = `getOne-${id}`
  const cache = await client.get(cacheKey)
  if (cache) {
    return JSON.parse(cache)
  }

  try {
    const result = await axios.get<Place>(
      `https://open-api.myhelsinki.fi/v1/place/${id}`
    )

    await client.set('cacheKey', JSON.stringify(result.data))
    return result.data
  } catch (error) {
    throw new InternalServerError()
  }
}

export default {
  getAll,
  getById,
}
