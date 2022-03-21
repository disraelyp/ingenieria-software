import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { textFieldVariant } from '../../Styles/muiVariants'

const PasswordInput = ({ value, label, onChange, error, onBlur, onFocus, errorMessage, disable, moreSx }) => {

  const [showValues, setShowValues] = useState(true)

  return (
    <FormControl sx={moreSx ? moreSx : { marginTop: 2.5, width: '100%', }} >
      <TextField
        type={showValues ? 'password' : 'text'}
        id={'password-PasswordInput'}
        label={label}
        variant={textFieldVariant[0]}
        value={value}
        onChange={onChange}
        disabled = { disable ? true : false }
        error = { error ? true : false }
        onBlur={onBlur}
        onFocus={onFocus}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" >
              <IconButton aria-label="toggle password visibility" onClick={() => setShowValues(true)} onMouseDown={() => setShowValues(false)} >
                { showValues ? <Visibility /> : <VisibilityOff /> }
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormHelperText sx={{ color: error ? 'red' : 'white' }} > { errorMessage ? errorMessage : '.' } </FormHelperText>
    </FormControl>
  )
}

PasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
  disable: PropTypes.bool
}

export default PasswordInput