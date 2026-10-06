import { useState } from 'react'

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleReset = () => {
    setFormState(initialForm)
  }

  return {
    ...formState,
    formState,
    handleInputChange,
    handleReset,
  }
}

export default useForm
