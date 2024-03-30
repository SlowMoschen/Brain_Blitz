import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./shared/hooks/useAuth";
import { AuthContext } from "./shared/context/AuthContext";
import AuthLayout from "./routes/auth/AuthLayout";
import Login from "./routes/auth/pages/login/Login";
import { LoginLoader } from "./shared/loaders/login.loader";

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
      ],
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/auth/login",
                element: <Login />,
                loader: async () => await LoginLoader(),
            }
        ]
    },
  ]);

  const queryClient = new QueryClient();
  const { user, setUser } = useAuth();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
        </AuthContext.Provider>
      </QueryClientProvider>
    </>
  );
}
