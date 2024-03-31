import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./routes/home/pages/auth/Login";
import DashboardLayout from "./routes/dashboard/DashBoardLayout";
import Dashboard from "./routes/dashboard/pages/root/Dashboard";
import ErrorPage from "./routes/error/ErrorPage";
import RootLayout from "./routes/home/RootLayout";
import About from "./routes/home/pages/about/About";
import Contact from "./routes/home/pages/contact/Contact";
import FAQ from "./routes/home/pages/faq/FAQ";
import Home from "./routes/home/pages/home/Home";
import Imprint from "./routes/home/pages/imprint/Imprint";
import Memberships from "./routes/home/pages/memberships/Memeberships";
import Privacy from "./routes/home/pages/privacy/Privacy";
import Terms from "./routes/home/pages/terms/Terms";
import { LoginLoader } from "./shared/loaders/login.loader";
import Register from "./routes/home/pages/auth/Register";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/faq",
          element: <FAQ />,
        },
        {
          path: "memberships",
          element: <Memberships />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/imprint",
          element: <Imprint />,
        },
        {
          path: "/privacy",
          element: <Privacy />,
        },
        {
          path: "/terms",
          element: <Terms />,
        },
        {
          path: "/auth/login",
          element: <Login />,
          loader: async () => await LoginLoader(),
        },
        {
          path: "/auth/register",
          element: <Register />,
        }
      ],
    },
    {
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}
