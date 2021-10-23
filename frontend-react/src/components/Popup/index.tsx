import { useEffect, useState } from 'react'
import axios from 'axios'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

import { Hour, Place } from '../../types'
import { weekdays } from '../PlacesTable'

type PopupProps = {
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  clickedMarkerId: string | null
}

function CustomPopup({
  clickedMarkerId,
  open,
  anchorEl,
  handleClose,
}: PopupProps): JSX.Element {
  const [placeInfo, setPlaceInfo] = useState<Place | null>(null)
  const id = open ? 'simple-popover' : undefined

  useEffect(() => {
    const requestToken = axios.CancelToken
    const source = requestToken.source()

    if (clickedMarkerId) {
      axios
        .get<Place>(`/places/${clickedMarkerId}`, {
          cancelToken: source.token,
        })
        .then(res => {
          setPlaceInfo(res.data)
        })
    }

    return () => {
      setPlaceInfo(null)
      source.cancel()
    }
  }, [clickedMarkerId])

  const renderOpeningHours = (hour: Hour) => {
    const day = weekdays.find(w => w.id === hour.weekday_id)?.name

    return (
      <Typography key={hour.weekday_id} sx={{ p: 1 }}>
        {day}: {hour.opens}-{hour.closes}
      </Typography>
    )
  }

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Typography variant='h6' sx={{ p: 1 }}>
        {placeInfo?.name.en}
      </Typography>
      <Typography variant='subtitle1' sx={{ p: 1 }}>
        {placeInfo?.location.address.street_address}
      </Typography>
      <Typography sx={{ p: 1 }}>Opening Hours:</Typography>
      {placeInfo?.opening_hours.hours?.map(h => renderOpeningHours(h))}
    </Popover>
  )
}

export default CustomPopup
