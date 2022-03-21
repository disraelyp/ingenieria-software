import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { textFieldVariant } from '../../Styles/muiVariants'

const TextAreaInput = ({ label, value, onBlur, onFocus, onChange, error, disable, errorMessage, rows, moreSx }) => {

  return (
    <FormControl variant={textFieldVariant[0]} sx={ moreSx ? moreSx : { marginTop: 2.5, width: '100%' }} >
      <TextField
        id={label+'-TextAreaInput'}
        label={ label }
        multiline
        rows={rows}
        value={value}
        onChange={onChange}
        disabled = { disable ? true : false }
        error = { error ? true : false }
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <FormHelperText sx={{ color: error ? 'red' : 'white' }} > { errorMessage ? errorMessage : '.' } </FormHelperText>
    </FormControl>
  )
}

TextAreaInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  error: PropTypes.bool,
  disable: PropTypes.bool,
  errorMessage: PropTypes.string,
  rows:  PropTypes.number.isRequired,
}


export default TextAreaInput