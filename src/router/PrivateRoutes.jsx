/**
 * PrivateRoutes
 * Componente de orden superior para proteger rutas que requieren autenticación.
 * 
 * Reglas de negocio:
 * 1. Verifica si 'isLogged' existe en localStorage con valor 'true'.
 * 2. Si está autenticado, renderiza la barra de navegación (Navbar) y el contenido de la ruta (Outlet).
 * 3. Si no está autenticado, redirige automáticamente a /login reemplazando el historial.
 */

import { Navigate, Outlet } from 'react-router'
import Navbar from '../components/Navbar'

export const PrivateRoutes = () => {
  const isLogged = localStorage.getItem('isLogged') === 'true'

  if (!isLogged) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default PrivateRoutes
