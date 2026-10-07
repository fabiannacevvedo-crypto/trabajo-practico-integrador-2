/**
 * PublicRoutes
 * Componente para restringir el acceso a rutas públicas (Login, Register).
 * 
 * Reglas de negocio:
 * 1. Si el usuario ya cuenta con una sesión iniciada ('isLogged' === 'true'),
 *    se lo redirige a la página principal (HomePage) para evitar inicio duplicado.
 * 2. Si no tiene sesión activa, permite visualizar el contenido de la ruta pública (Outlet).
 */

import { Navigate, Outlet } from 'react-router'

export const PublicRoutes = () => {
  const isLogged = localStorage.getItem('isLogged') === 'true'

  if (isLogged) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PublicRoutes
