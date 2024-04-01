import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/home/RootLayout";
import Home from "./routes/home/pages/root/Root";
import { ThemeProvider } from "@emotion/react";
import customTheme from "./configs/CustomTheme";
import { CssBaseline } from "@mui/material";
import ErrorPage from "./routes/error/ErrorPage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/",
      element: <RootLayout />,
      children: [{ path: "/", element: <Home /> }],
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
