import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { SelectChangeEvent } from '@mui/material/Select'
import { Menu } from '@mui/material'

import SimpleDialog from '../Dialog'

type ToolbarProps = {
  handlePagination: (limit: number) => void
  limit: number
}

function MapToolbar({ handlePagination, limit }: ToolbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const open = Boolean(anchorEl)

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleChangeMarkerNumber = (event: SelectChangeEvent) => {
    handlePagination(Number(event.target.value as string))
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={handleOpenMenu}
            id='menu-icon'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='map-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'menu-icon',
            }}
          >
            <MenuItem onClick={handleOpenDialog}>Filter</MenuItem>
          </Menu>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Map View
          </Typography>
        </Toolbar>
      </AppBar>
      <SimpleDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        handleChangeMarkerNumber={handleChangeMarkerNumber}
        markerNumber={limit.toString()}
      />
    </Box>
  )
}

export default MapToolbar
