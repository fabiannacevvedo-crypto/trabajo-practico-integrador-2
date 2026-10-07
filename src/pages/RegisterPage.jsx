import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from '../hooks/useForm'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { formState, handleInputChange, handleReset } = useForm({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    biography: '',
    avatar_url: '',
    birth_date: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])
  const [generalError, setGeneralError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setValidationErrors([])
    setGeneralError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formState),
      })

      if (response.status === 201) {
        handleReset()
        setSuccessMessage('¡Usuario registrado con éxito! Redirigiendo al inicio de sesión...')
        setTimeout(() => {
          navigate('/login')
        }, 1200)
        return
      }

      if (response.status === 400) {
        const errorData = await response.json()
        if (Array.isArray(errorData)) {
          setValidationErrors(errorData)
        } else if (errorData.message) {
          setValidationErrors([errorData.message])
        } else {
          setValidationErrors(['Datos de registro incompletos o inválidos.'])
        }
        return
      }

      if (response.status === 500) {
        setGeneralError('Error interno del servidor. Por favor, reintente más tarde.')
        return
      }

      const resData = await response.json().catch(() => null)
      setGeneralError(resData?.message || `Error inesperado: ${response.status}`)
    } catch (err) {
      setGeneralError('Error de conexión con el servidor. Verifique que el backend esté en ejecución.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg border border-slate-200 p-8 space-y-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow">
            BP
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Crear nueva cuenta
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Completa tus datos para registrarte en la plataforma
          </p>
        </div>

        {successMessage && (
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
            {successMessage}
          </div>
        )}

        {generalError && (
          <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
            {generalError}
          </div>
        )}

        {validationErrors.length > 0 && (
          <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm space-y-1">
            <p className="font-semibold">Errores de validación:</p>
            <ul className="list-disc list-inside space-y-0.5">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Nombre de usuario *
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formState.username}
                onChange={handleInputChange}
                placeholder="Ej: juanperez"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Correo electrónico *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={handleInputChange}
                placeholder="juan@ejemplo.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Contraseña *
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

          <div className="pt-2 border-t border-slate-200">
            <h3 className="text-sm font-medium text-slate-900 mb-3">
              Datos del perfil (Opcional)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-xs font-medium text-slate-600 mb-1"
                >
                  Nombre
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formState.first_name}
                  onChange={handleInputChange}
                  placeholder="Juan"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-xs font-medium text-slate-600 mb-1"
                >
                  Apellido
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formState.last_name}
                  onChange={handleInputChange}
                  placeholder="Pérez"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm text-sm"
                />
              </div>
            </div>

            <div className="mt-3">
              <label
                htmlFor="biography"
                className="block text-xs font-medium text-slate-600 mb-1"
              >
                Biografía
              </label>
              <textarea
                id="biography"
                name="biography"
                rows="2"
                value={formState.biography}
                onChange={handleInputChange}
                placeholder="Breve descripción sobre ti..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow transition duration-150 ease-in-out disabled:opacity-50 flex items-center justify-center cursor-pointer mt-4"
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
                <span>Registrando...</span>
              </span>
            ) : (
              'Crear cuenta'
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-sm text-slate-600">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
