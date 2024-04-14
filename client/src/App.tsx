import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import customTheme from "./configs/CustomTheme";
import AuthLayout from "./routes/auth/AuthLayout";
import ForgotPassword from "./routes/auth/pages/ForgotPassword";
import ResendVerification from "./routes/auth/pages/ResendVerification";
import Profile from "./routes/dashboard/pages/profile/Profile";
import Rankings from "./routes/dashboard/pages/rankings/Rankings";
import ErrorPage from "./routes/error/ErrorPage";
import RootLayout from "./routes/home/RootLayout";
import About from "./routes/home/pages/about/About";
import Contact from "./routes/home/pages/contact/Contact";
import FAQ from "./routes/home/pages/faq/FAQ";
import Imprint from "./routes/home/pages/imprint/Imprint";
import Memberships from "./routes/home/pages/memberships/Memberships";
import Privacy from "./routes/home/pages/privacy/Privacy";
import Home from "./routes/home/pages/root/Root";
import Terms from "./routes/home/pages/terms/Terms";
import LoadingScreen from "./shared/components/LoadingScreen";
import { WindowContextProvider } from "./shared/context/ScreenSize.context";
import { UserIDContextProvider } from "./shared/context/UserID.context";
import { SocketContextProvider } from "./shared/context/Socket.context";
const QuizRanking = lazy(() => import("./routes/dashboard/pages/rankings/Quiz.Ranking"));
const DashboardLayout = lazy(() => import("./routes/dashboard/DashboardLayout"));
const DashboardRoot = lazy(() => import("./routes/dashboard/pages/root/Root"));
const SignIn = lazy(() => import("./routes/auth/pages/SignIn"));
const SignUp = lazy(() => import("./routes/auth/pages/SignUp"));
const QuizPage = lazy(() => import("./routes/quiz/QuizPage"));
const QuizLayout = lazy(() => import("./routes/quiz/QuizLayout"));

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
        { path: "about", element: <About /> },
        { path: "faq", element: <FAQ /> },
        { path: "memberships", element: <Memberships /> },
        { path: "imprint", element: <Imprint /> },
        { path: "terms-and-conditions", element: <Terms /> },
        { path: "privacy", element: <Privacy /> },
        { path: "contact", element: <Contact /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "resend-verification-email", element: <ResendVerification /> },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "/dashboard", element: <DashboardRoot /> },
        { path: "profile", element: <Profile /> },
        { path: "rankings", element: <Rankings /> },
        { path: "rankings/quiz-ranking/:quizID", element: <QuizRanking /> },
        {
          path: "quiz",
          element: <QuizLayout />,
          children: [{ path: ":quizID", element: <QuizPage /> }],
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <WindowContextProvider>
            <SocketContextProvider>
              <UserIDContextProvider>
                <Suspense fallback={<LoadingScreen />}>
                  <RouterProvider router={router} />
                </Suspense>
              </UserIDContextProvider>
            </SocketContextProvider>
          </WindowContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
