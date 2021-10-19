import axios from 'axios'

import { InternalServerError } from '../util/error'
import { Place, PlacesResponse } from '../types'

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
