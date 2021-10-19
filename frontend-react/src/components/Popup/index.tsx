import { useEffect, useState } from 'react'
import { Popup } from 'react-mapbox-gl'
import axios from 'axios'

import { ClickedMarker } from '../../pages/MapView'
import { Place } from '../../types'
import { Typography } from '@mui/material'

type PopupProps = {
  markerLocation: ClickedMarker
}

function CustomPopup({
  markerLocation: { long, lat, isOpen, id },
}: PopupProps): JSX.Element {
  const [placeInfo, setPlaceInfo] = useState<Place | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get<Place>(`http://localhost:5000/api/v1/places/${id}`)
        .then(res => {
          setPlaceInfo(res.data)
        })
    }
  }, [id])

  return (
    <Popup
      style={{ display: isOpen ? 'block' : 'none' }}
      coordinates={[long, lat]}
    >
      {placeInfo && (
        <>
          <Typography variant='h6'>{placeInfo.name.fi}</Typography>
          <Typography variant='subtitle1'>
            {placeInfo.location.address.street_address}
          </Typography>
        </>
      )}
    </Popup>
  )
}

export default CustomPopup
