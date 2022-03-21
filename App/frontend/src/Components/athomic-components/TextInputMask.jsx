import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputMask from 'react-input-mask'
import { textFieldVariant } from '../../Styles/muiVariants'

const TextInputMask = ({ label, type, mask, maskChar, value, onChange, error, onBlur, onFocus, errorMessage, moreSx }) => {

  return (
    <FormControl variant={textFieldVariant[0]} sx={ moreSx ? moreSx : { marginTop: 2.5, width: '100%' }} >
      <InputMask
        mask={mask}
        value={value}
        maskChar={maskChar}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
      >
        {() => <TextField
          id={label+'-textInput'}
          label={ label }
          variant={textFieldVariant[0]}
          error = { error ? true : false }
          type = {type}
          value={value}
          onChange={onChange}
        />
        }
      </InputMask>


      <FormHelperText sx={{ color: error ? 'red' : 'white' }} > { errorMessage ? errorMessage : '.' } </FormHelperText>
    </FormControl>
  )
}

TextInputMask.propTypes = {
  mask: PropTypes.string.isRequired,
  maskChar: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
  disable: PropTypes.bool
}


export default TextInputMask