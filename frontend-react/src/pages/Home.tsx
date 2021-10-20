import { AppBar, Toolbar, Typography } from '@mui/material'

import PlacesTable from '../components/PlacesTable'
import ViewSwitch from '../components/ViewSwitch'

type HomeProps = {
  checked: boolean
  handleChange: () => void
}

function Home({ checked, handleChange }: HomeProps) {
  return (
    <div>
      <AppBar position='static' sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Helsinki Places
          </Typography>
          <ViewSwitch checked={checked} handleChange={handleChange} />
        </Toolbar>
      </AppBar>
      <PlacesTable />
    </div>
  )
}

export default Home
