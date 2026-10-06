import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from '../hooks/useForm'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { formState, handleInputChange } = useForm({
    username: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formState),
      })

      if (response.status === 200) {
        localStorage.setItem('isLogged', 'true')
        navigate('/', { replace: true })
        return
      }

      if (response.status === 401) {
        setErrorMessage('Credenciales incorrectas. Verifique su usuario y contraseña.')
        return
      }

      if (response.status === 400) {
        const errorData = await response.json()
        if (Array.isArray(errorData)) {
          setErrorMessage(errorData.join(' | '))
        } else {
          setErrorMessage(errorData.message || 'Datos de inicio de sesión inválidos.')
        }
        return
      }

      if (response.status === 500) {
        setErrorMessage('Error interno del servidor. Por favor, reintente más tarde.')
        return
      }

      const defaultError = await response.json().catch(() => null)
      setErrorMessage(defaultError?.message || `Error inesperado: ${response.status}`)
    } catch (err) {
      setErrorMessage('Error de conexión con el servidor. Verifique que el backend esté en ejecución.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-slate-200 p-8 space-y-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow">
            BP
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Iniciar sesión
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Ingresa tus credenciales para acceder al blog
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start space-x-2">
            <span className="font-semibold">Error:</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Nombre de usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formState.username}
              onChange={handleInputChange}
              placeholder="Ej: usuario123"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formState.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow transition duration-150 ease-in-out disabled:opacity-50 flex items-center justify-center cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-flex items-center space-x-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span>Iniciando sesión...</span>
              </span>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-sm text-slate-600">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
