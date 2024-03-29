import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import ErrorPage from './routes/error/ErrorPage.tsx'
import RootLayout from './routes/home/RootLayout.tsx'
import Home from './routes/home/pages/home/Home.tsx'
import About from './routes/home/pages/about/About.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Imprint from './routes/home/pages/imprint/Imprint.tsx'
import Privacy from './routes/home/pages/privacy/Privacy.tsx'
import Terms from './routes/home/pages/terms/Terms.tsx'
import FAQ from './routes/home/pages/faq/FAQ.tsx'
import Contact from './routes/home/pages/contact/Contact.tsx'

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
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/imprint',
        element: <Imprint />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/terms',
        element: <Terms />,
      },
      {
        path: '/faq',
        element: <FAQ />,
      }
    ],
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
