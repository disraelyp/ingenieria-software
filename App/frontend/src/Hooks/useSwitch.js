import { useState } from 'react'


const useSwitch = (initialValue) => {
  const [checked, setChecked] = useState(initialValue)

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return { checked, handleChange }
}

export default useSwitch