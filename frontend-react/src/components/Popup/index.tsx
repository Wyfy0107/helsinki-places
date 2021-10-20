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
    if (clickedMarkerId) {
      axios
        .get<Place>(`http://localhost:5000/api/v1/places/${clickedMarkerId}`)
        .then(res => {
          setPlaceInfo(res.data)
        })
    }

    return () => {
      setPlaceInfo(null)
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
        {placeInfo?.name.en}
      </Typography>
      {placeInfo?.opening_hours.hours?.map(h => renderOpeningHours(h))}
    </Popover>
  )
}

export default CustomPopup
