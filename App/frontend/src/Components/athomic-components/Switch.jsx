import React from 'react'
import PropTypes from 'prop-types'
import { FormControlLabel } from '@mui/material'
import { Switch } from '@mui/material'


const SwitchInput = ({ checked, label, handleChange, disable, moreSx, color }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          color={color}
          disabled={disable ? true : false}
        />
      }
      label={label}
      sx={ moreSx ? moreSx : { marginTop: 2.5, width: '100%' }}
    />
  )
}

SwitchInput.prototype = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  disable: PropTypes.bool,
  color: PropTypes.string.isRequired,
}

export default SwitchInput