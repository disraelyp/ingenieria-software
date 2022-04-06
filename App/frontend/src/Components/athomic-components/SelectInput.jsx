import * as React from 'react'
import PropTypes from 'prop-types'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { selectFieldVariant } from '../../Styles/muiVariants'


const SelectInput = ({ label, text, onChange, onClick, onFocus, onBlur, value, options, error, errorMessage, disable, moreSx }) => {

  if(value === 0){
    if(!options.find(op => op.value === 0)){
      options.unshift({ label: text, value: 0 })
    }
  }

  return (
    <FormControl variant={selectFieldVariant[0]} sx={ moreSx ? moreSx : { marginTop: 2.5, width: '100%', }} >
      <InputLabel id={label + '-select-label'}>{ label }</InputLabel>
      <Select
        labelId={label + '-select-label'}
        id={label + '-simple-select'}
        value={value}
        label={ label }
        onChange={onChange}
        onClick={onClick}
        sx={ error ? { color: 'red' } : { color: 'black' } }
        disabled = { disable ? true : false }
        error = { error ? true : false }
        onBlur={onBlur}
        onFocus={onFocus}
      >
        { options.map(option => <MenuItem key={option.value} value={option.value}>{ option.label }</MenuItem>) }
      </Select>
      <FormHelperText sx={{ color: error ? 'red' : 'white' }} > { errorMessage ? errorMessage : '.' } </FormHelperText>
    </FormControl>
  )
}

SelectInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  errorMessage: PropTypes.string,
  disable: PropTypes.bool
}

export default SelectInput