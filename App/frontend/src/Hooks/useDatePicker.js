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

  const onChange = (value) => {
    setValue(value)
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

  if(afterFocus !== focused) {
    setAfterFocus(focused)
  }
  if(focused === false && afterFocus === true) {
    validation(value) === null ? null : createError(validation(value))
  }

  return { functions: { reset, createError, isFocused, deleteError }, form : { value, type,  onChange, onFocus, onBlur, error, errorMessage } }
}

export default useField