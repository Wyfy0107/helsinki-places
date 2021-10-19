import { Typography } from '@mui/material'

import PlacesTable from './components/PlacesTable'

function App() {
  return (
    <div>
      <Typography variant='h1' fontSize='4rem' sx={{ m: '1rem' }}>
        Helsinki Places
      </Typography>
      <PlacesTable />
    </div>
  )
}

export default App
