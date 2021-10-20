import { useState } from 'react'
import ReactMapboxGl from 'react-mapbox-gl'

import ErrorPage from '../components/Error'
import MapToolbar from '../components/MapToolbar'
import CustomMarker from '../components/Marker'
import CustomPopup from '../components/Popup'
import usePlaces from '../hooks/usePlaces'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoid3lmeSIsImEiOiJja3V5YWFmY2czNzlkMm9xcjdqYXF0NGpjIn0.Fk-ITa0-NMXxwoonkkgQkA',
})

const helsinkiCoordinates: [number, number] = [24.945831, 60.192059]
export const limitRange = [10, 20, 30]

type MapProps = {
  checked: boolean
  handleChange: () => void
}

function MapView({ checked, handleChange }: MapProps) {
  const [pagination, setPagination] = useState({
    page: 0,
    limit: limitRange[0],
  })
  const [clickedMarkerId, setClickedMarkerId] = useState<string | null>(null)
  const [places, , error] = usePlaces(pagination)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleMarkerClick = (event: React.MouseEvent<any>, id: string) => {
    setAnchorEl(event.currentTarget)
    setClickedMarkerId(id)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handlePagination = (limit: number) => {
    setPagination({ page: 0, limit })
  }

  if (error) {
    return <ErrorPage />
  }

  return (
    <>
      <MapToolbar
        handlePagination={handlePagination}
        limit={pagination.limit}
        checked={checked}
        handleChange={handleChange}
      />
      <Map
        // eslint-disable-next-line
        style='mapbox://styles/mapbox/streets-v9'
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
        center={helsinkiCoordinates}
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
        <CustomPopup
          clickedMarkerId={clickedMarkerId}
          anchorEl={anchorEl}
          handleClose={handleClose}
          open={open}
        />
      </Map>
    </>
  )
}

export default MapView
