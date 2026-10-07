import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

// Componente para evaluar dinámicamente la redirección de la ruta comodín
const WildcardRedirect = () => {
  const isLogged = localStorage.getItem('isLogged') === 'true'
  return <Navigate to={isLogged ? '/' : '/login'} replace />
}

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas: accesibles solo si no está autenticado */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rutas privadas: accesibles solo si isLogged === true */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Ruta comodín: redirige según el estado de sesión actual */}
        <Route path="*" element={<WildcardRedirect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
