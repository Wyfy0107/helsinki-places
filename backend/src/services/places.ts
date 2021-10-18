import axios from 'axios'

import { InternalServerError } from '../util/error'
import { PlacesResponse } from '../types'

const getAll = async (
  page?: number,
  limit?: number
): Promise<PlacesResponse> => {
  try {
    const allPlaces = await axios.get<PlacesResponse>(
      'https://open-api.myhelsinki.fi/v1/places/?language_filter=en'
    )

    return allPlaces.data
  } catch (error) {
    throw new InternalServerError()
  }
}

// const getByName = async (name: string) => {
//   try {
// 	  const result = await axios.get
//   } catch (error) {
//     throw new InternalServerError()
//   }
// }

export default {
  getAll,
}
