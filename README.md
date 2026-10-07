# Trabajo Práctico Integrador N° II - Frontend de Blog Personal

Aplicación frontend desarrollada en **React** con **Vite**, **Tailwind CSS** y **React Router**, diseñada para interactuar como cliente del sistema de blog personal desarrollado en el **Trabajo Práctico Integrador N° I**.

- **Alumno:** Fabian Acevedo
- **Materia:** Taller de Lenguajes de Programación II
- **Carrera:** Tecnicatura Superior en Desarrollo de Software
- **Instituto:** Instituto Politécnico Formosa

---

## 🔗 Repositorio del Backend (TP Integrador N° I)

Este proyecto consume la API REST del backend desarrollada en el TP Integrador N° I:
- **Repositorio:** [https://github.com/axelcardozo369-hub/trabajo-practico-integrador-1.git](https://github.com/axelcardozo369-hub/trabajo-practico-integrador-1.git)

---

## 🚀 Tecnologías Aplicadas

- **React 19:** Componentes funcionales, hooks `useState`, `useEffect` y custom hooks.
- **Vite:** Herramienta de compilación y servidor local con Hot Module Replacement (HMR).
- **Tailwind CSS v4:** Framework utilitario para los estilos y diseño responsivo.
- **React Router 7 (`react-router`):** Navegación declarativa mediante `BrowserRouter`, `Routes`, `Route`, `Navigate` y `Link`.
- **Fetch API nativo:** Comunicación cliente-servidor con envío de credenciales (`credentials: 'include'`).

---

## 📁 Estructura del Proyecto

```text
src/
├── components/
│   └── Navbar.jsx           # Barra de navegación visible únicamente en rutas privadas con opción de Logout
├── hooks/
│   ├── useFetch.js          # Custom hook para peticiones GET con estados de carga y error
│   └── useForm.js           # Custom hook para manejo controlado de formularios y reseteo
├── pages/
│   ├── HomePage.jsx         # Página privada con listado de artículos y estados visuales
│   ├── LoginPage.jsx        # Página pública de inicio de sesión
│   └── RegisterPage.jsx     # Página pública de registro con validaciones
├── router/
│   ├── AppRouter.jsx        # Definición de rutas y redirección comodín
│   ├── PrivateRoutes.jsx    # Protección de rutas privadas (requiere isLogged === 'true')
│   └── PublicRoutes.jsx     # Protección de rutas públicas (redirige a Home si hay sesión)
├── App.jsx                  # Componente raíz
├── index.css                # Estilos base con Tailwind CSS
└── main.jsx                 # Montaje de la aplicación con createRoot y StrictMode
```

---

## ⚙️ Instalación y Puesta en Marcha

### 1. Iniciar el Backend (TP I)
1. Abrir la terminal en la carpeta del backend:
   ```bash
   cd trabajo-practico-integrador-1
   ```
2. Instalar dependencias si es necesario:
   ```bash
   npm install
   ```
3. Asegurarse de tener el servicio de MySQL levantado (por ejemplo en XAMPP).
4. Iniciar el servidor:
   ```bash
   node app.js
   ```
   *El backend correrá en `http://localhost:3000` con CORS habilitado para `http://localhost:5173`.*

### 2. Iniciar el Frontend (TP II)
1. Abrir una nueva terminal en la carpeta del frontend:
   ```bash
   cd trabajo-practico-integrador-2
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Iniciar el entorno de desarrollo:
   ```bash
   npm run dev
   ```
4. Ingresar desde el navegador a la URL provista por Vite: `http://localhost:5173`

---

## 🔒 Manejo de Sesión y Rutas Protegidas

- **Estado de sesión:** Se almacena `isLogged = true` en `localStorage` únicamente ante un inicio de sesión exitoso (`200 OK`). No se utiliza Context API.
- **Rutas privadas (`/`):** Controladas por `PrivateRoutes`. Si no existe `isLogged`, redirige automáticamente a `/login`.
- **Rutas públicas (`/login`, `/register`):** Controladas por `PublicRoutes`. Si el usuario ya cuenta con sesión iniciada, redirige directamente a `/`.
- **Ruta comodín (`*`):** Cualquier ruta no existente redirige a `/` si hay sesión o a `/login` si no la hay.
- **Cierre de sesión:** Al presionar "Cerrar sesión" en la Navbar, se envía una petición `POST /api/auth/logout` con `credentials: 'include'` para limpiar la cookie en el backend, se elimina `isLogged` del `localStorage` y se redirige al login.

---

## 🔀 Estructura de Ramas Git

El repositorio cuenta con la estructura de 4 ramas solicitada en la consigna:
1. `main`: Rama principal de entrega.
2. `develop`: Rama de integración.
3. `desarrollo-pantallas`: Desarrollo de los custom hooks, componentes, páginas y estilos con Tailwind CSS.
4. `proteccion-rutas`: Implementación de rutas públicas, privadas, autenticación contra la API y control de sesión con `localStorage`.
