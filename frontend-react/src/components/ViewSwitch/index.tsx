import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'

type SwitchProps = {
  checked: boolean
  handleChange: () => void
}

function ViewSwitch({ checked, handleChange }: SwitchProps) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={handleChange} color='default' />
        }
        label='Map View'
      />
    </FormGroup>
  )
}

export default ViewSwitch
