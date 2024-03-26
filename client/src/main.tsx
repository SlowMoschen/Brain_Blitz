import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import ErrorPage from './routes/error/ErrorPage.tsx'
import RootLayout from './routes/home/RootLayout.tsx'
import Home from './routes/home/pages/home/Home.tsx'
import About from './routes/home/pages/about/About.tsx'

const router = createBrowserRouter([
  {
    path: '*',
    element: <ErrorPage />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
