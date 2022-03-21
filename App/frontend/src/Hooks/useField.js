
import { useState } from 'react'

const useField = (type, initialValue, validation) => {

  const [value, setValue] = useState(initialValue)
  const [focused, setFocused] = useState(false)
  const [afterFocus , setAfterFocus] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const isFocused = () => { return focused }
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  const onChange = (event) => {
    setValue(event.target.value)
    deleteError()
  }
  const reset = () => {
    setValue(initialValue)
  }
  const createError = (message) => {
    setError(true)
    setErrorMessage(message)
  }
  const deleteError = () => {
    setError(false)
    setErrorMessage('')
  }
  const isValidate = () => {
    if (validation(value) === null) {
      return true
    }
    return false
  }
  const validate = () => {
    validation(value) === null ? null : createError(validation(value))
  }

  if(afterFocus !== focused) {
    setAfterFocus(focused)
  }
  if(focused === false && afterFocus === true) {
    validate()
  }

  return { functions: { reset, createError, isFocused, isValidate, setValue, validate }, form : { value, type,  onChange, onFocus, onBlur, error, errorMessage } }
}

export default useField