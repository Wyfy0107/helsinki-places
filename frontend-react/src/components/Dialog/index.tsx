import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export type SimpleDialogProps = {
  open: boolean
  handleClose: () => void
  handleChangeMarkerNumber: (event: SelectChangeEvent) => void
  markerNumber: string
}

function SimpleDialog({
  open,
  handleClose,
  handleChangeMarkerNumber,
  markerNumber,
}: SimpleDialogProps) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>How many places you want to see?</DialogTitle>

      <Box sx={{ m: 2 }}>
        <FormControl fullWidth>
          <InputLabel id='marker-select'>Places</InputLabel>
          <Select
            labelId='marker-select'
            id='marker-number-select'
            value={markerNumber}
            label='Age'
            onChange={handleChangeMarkerNumber}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Dialog>
  )
}

export default SimpleDialog
