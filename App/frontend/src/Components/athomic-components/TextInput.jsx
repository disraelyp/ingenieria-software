import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { textFieldVariant } from '../../Styles/muiVariants'

const TextInput = ({ label, type, value, onChange, error, onBlur, onFocus, disable, errorMessage, moreSx }) => {

  return (
    <FormControl variant={textFieldVariant[0]} sx={ moreSx ? moreSx : { marginTop: 2.5, width: '100%' }} >
      <TextField
        id={label+'-textInput'}
        label={ label }
        variant={textFieldVariant[0]}
        value={value}
        onChange={onChange}
        disabled = { disable ? true : false }
        error = { error ? true : false }
        type = {type}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <FormHelperText sx={{ color: error ? 'red' : 'white' }} > { errorMessage ? errorMessage : '.' } </FormHelperText>
    </FormControl>
  )
}

TextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
  disable: PropTypes.bool
}


export default TextInput