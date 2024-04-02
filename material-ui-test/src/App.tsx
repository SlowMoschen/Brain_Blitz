import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/home/RootLayout";
import Home from "./routes/home/pages/root/Root";
import { ThemeProvider } from "@emotion/react";
import customTheme from "./configs/CustomTheme";
import { CssBaseline } from "@mui/material";
import ErrorPage from "./routes/error/ErrorPage";
import About from "./routes/home/pages/about/About";
import FAQ from "./routes/home/pages/faq/FAQ";
import Memberships from "./routes/home/pages/memberships/Memberships";
import Imprint from "./routes/home/pages/imprint/Imprint";
import Terms from "./routes/home/pages/terms/Terms";
import Privacy from "./routes/home/pages/privacy/Privacy";
import Contact from "./routes/home/pages/contact/Contact";

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
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/faq", element: <FAQ />},
        { path: '/memberships', element: <Memberships /> },
        { path: "/imprint", element: <Imprint />},
        { path: "/terms-and-conditions", element: <Terms />},
        { path: "/privacy", element: <Privacy />},
        { path: '/contact', element: <Contact />}
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
