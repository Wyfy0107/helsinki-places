export type Hour = {
  weekday_id: number
  opens: string | null
  closes: string | null
  open24h: boolean
}

export type Place = {
  name: {
    fi: string | null
    en: string | null
    sv: string | null
    zh: string | null
  }
  location: {
    lat: number
    lon: number
    address: {
      street_address: string
      postal_code: string
      locality: string
    }
  }
  opening_hours: {
    hours: Hour[]
    openinghours_exception: string
  }
}

export type PlacesResponse = {
  meta: {
    count: number
    page: null | number
    limit: null | number
  }
  data: Place[]
}
