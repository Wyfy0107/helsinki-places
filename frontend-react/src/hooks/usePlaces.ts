import { useState, useEffect } from 'react'
import axios from 'axios'

import { PlacesResponse } from '../types'

type Pagination = {
  page: number
  limit: number
}

const usePlaces = ({
  page,
  limit,
}: Pagination): [PlacesResponse | null, boolean, Error | null] => {
  const [allPlaces, setAllPlaces] = useState<PlacesResponse | null>(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const requestToken = axios.CancelToken
    const source = requestToken.source()
    setLoading(true)

    axios
      .get<PlacesResponse>(
        `http://localhost:5000/api/v1/places?page=${page + 1}&limit=${limit}`,
        { cancelToken: source.token }
      )
      .then(res => {
        setAllPlaces(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
      })

    return () => {
      source.cancel()
    }
  }, [limit, page])

  return [allPlaces, loading, error]
}

export default usePlaces
