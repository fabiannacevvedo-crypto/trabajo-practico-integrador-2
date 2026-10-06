import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export const Navbar = () => {
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      localStorage.removeItem('isLogged')
      setIsLoggingOut(false)
      navigate('/login', { replace: true })
    }
  }

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-sm">
              BP
            </div>
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-white hover:text-indigo-400 transition-colors"
            >
              Blog Personal
            </Link>
          </div>

          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-sm font-medium text-slate-200 hover:text-white px-3 py-2 rounded-md hover:bg-slate-800 transition"
            >
              Inicio
            </Link>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center justify-center text-sm font-medium px-4 py-2 rounded-md bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition disabled:opacity-50 cursor-pointer"
            >
              {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
