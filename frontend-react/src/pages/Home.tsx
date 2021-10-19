import { Typography } from '@mui/material'

import PlacesTable from '../components/PlacesTable'

function Home() {
  return (
    <div>
      <Typography variant='h1' fontSize='4rem' sx={{ m: '1rem' }}>
        Helsinki Places
      </Typography>
      <PlacesTable />
    </div>
  )
}

export default Home
