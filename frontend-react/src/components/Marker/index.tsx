import { Marker } from 'react-mapbox-gl'

import RoomIcon from '@mui/icons-material/Room'
import { Place } from '../../types'

type MarkerProps = {
  location: Place['location']
  id: string
  handleMarkerClick: (event: React.MouseEvent<any>, id: string) => void
}

function CustomMarker({
  location: { lat, lon },
  handleMarkerClick,
  id,
}: MarkerProps) {
  return (
    <Marker
      coordinates={[lon, lat]}
      anchor='bottom'
      onClick={event => handleMarkerClick(event, id)}
    >
      <RoomIcon color='primary' />
    </Marker>
  )
}

export default CustomMarker
