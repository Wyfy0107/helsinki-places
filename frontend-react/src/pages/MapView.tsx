import { useState } from 'react'
import ReactMapboxGl from 'react-mapbox-gl'

import ErrorPage from '../components/Error'
import CustomMarker from '../components/Marker'
import CustomPopup from '../components/Popup'
import usePlaces from '../hooks/usePlaces'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoid3lmeSIsImEiOiJja3V5YWFmY2czNzlkMm9xcjdqYXF0NGpjIn0.Fk-ITa0-NMXxwoonkkgQkA',
})

export type ClickedMarker = {
  lat: number
  long: number
  isOpen: boolean
  id: string | null
}

function MapView() {
  const [pagination, setPagination] = useState({ page: 0, limit: 10 })
  const [clickedMarker, setClickedMarker] = useState<ClickedMarker>({
    lat: 0,
    long: 0,
    isOpen: false,
    id: null,
  })
  const [places, loading, error] = usePlaces(pagination)

  const handleMarkerClick = (long: number, lat: number, id: string) => {
    setClickedMarker({ long, lat, id, isOpen: !clickedMarker.isOpen })
  }

  if (error) {
    return <ErrorPage />
  }

  return (
    <Map
      // eslint-disable-next-line
      style='mapbox://styles/mapbox/streets-v9'
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}
      // Helsinki coordinates
      center={[24.945831, 60.192059]}
    >
      <>
        {places?.data.map(p => (
          <CustomMarker
            key={p.id}
            location={p.location}
            handleMarkerClick={handleMarkerClick}
            id={p.id}
          />
        ))}
      </>
      <CustomPopup markerLocation={clickedMarker} />
    </Map>
  )
}

export default MapView
