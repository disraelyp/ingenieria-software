import React from 'react'
import PropTypes from 'prop-types'
import { textFieldVariant } from '../../Styles/muiVariants'
import DatePicker from '@mui/lab/DatePicker'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import esLocale from 'date-fns/locale/es'
import TextField from '@mui/material/TextField'

const DateInput = ({ label, value, disablePast, onBlur, onFocus, onChange, error, disable, errorMessage, moreSx }) => {

  return (
    <FormControl variant={textFieldVariant[0]} error={error ? true : false} sx={ moreSx ? moreSx : { marginTop: 2.5, width: '100%' }} >
      <LocalizationProvider locale={esLocale} dateAdapter={AdapterDateFns}>
        <DatePicker
          disablePast={disablePast ? false : true}
          label={label}
          openTo="year"
          views={['year', 'month', 'day']}
          error={error ? true : false}
          value={value}
          disabled = { disable ? true : false }
          onChange={(newValue) => onChange(newValue)}
          renderInput={(params) => <TextField onKeyDown={(event) => { event.preventDefault()}} error={error ? true : false} {...params} />}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </LocalizationProvider>
      <FormHelperText sx={{ color: error ? 'red' : 'white' }} > { errorMessage ? errorMessage : error ? 'Ingrese una fecha valida' : '.' } </FormHelperText>
    </FormControl>
  )
}

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
  disable: PropTypes.bool,
}


export default DateInput