import React from 'react'
import { Typography } from '@mui/material'

import Place from '../components/Place'

function HomePage() {
  return (
    <div>
      <Typography variant='h1' fontSize='3rem'>
        My Places
      </Typography>
      <Place />
    </div>
  )
}

export default HomePage
