import { useState } from 'react'
import ReactMapboxGl from 'react-mapbox-gl'

import ErrorPage from '../components/Error'
import MapToolbar from '../components/MapToolbar'
import CustomMarker from '../components/Marker'
import CustomPopup from '../components/Popup'
import usePlaces from '../hooks/usePlaces'

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
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

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleMarkerHover = (event: React.MouseEvent<any>, id: string) => {
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
              handleMarkerHover={handleMarkerHover}
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
