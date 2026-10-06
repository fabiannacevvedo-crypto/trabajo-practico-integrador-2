import { useState, useEffect } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    if (!url) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        let errorMessage = `Error HTTP: ${response.status}`
        try {
          const errData = await response.json()
          if (errData && errData.message) {
            errorMessage = errData.message
          }
        } catch {
          // Respuesta sin JSON
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message || 'Error al obtener los datos')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  }
}

export default useFetch
