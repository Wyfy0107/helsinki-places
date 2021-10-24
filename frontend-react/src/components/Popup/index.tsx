import { useEffect, useState } from 'react'
import axios from 'axios'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { v4 } from 'uuid'

import { Hour, Place } from '../../types'
import { weekdays } from '../PlacesTable'
import Box from '@mui/material/Box'

type PopupProps = {
  open: boolean
  anchorEl: HTMLElement | null
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

  const loader = () => {
    return (
      <Box sx={{ p: 2, width: 210, height: 400 }}>
        {new Array(4).fill(undefined).map(() => (
          <Skeleton key={v4()} width={210} height={50} />
        ))}
      </Box>
    )
  }

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      {placeInfo ? (
        <Box onMouseLeave={handleClose} sx={{ p: 1 }}>
          <Typography variant='h6' sx={{ p: 1 }}>
            {placeInfo?.name.en}
          </Typography>
          <Typography variant='subtitle1' sx={{ p: 1 }}>
            {placeInfo?.location.address.street_address}
          </Typography>
          <Typography sx={{ p: 1 }}>Opening Hours:</Typography>
          {placeInfo?.opening_hours.hours?.map(h => renderOpeningHours(h))}
        </Box>
      ) : (
        loader()
      )}
    </Popover>
  )
}

export default CustomPopup
