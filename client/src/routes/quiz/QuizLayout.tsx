import { Outlet, useNavigate } from "react-router-dom";
import { useSessionFetch } from "../../shared/hooks/api/useSessionFetch.hook";
import { useEffect, useState } from "react";
import { URLS } from "../../configs/Links";
import LoadingScreen from "../../shared/components/LoadingScreen";

export default function QuizLayout() {
  const redirect = useNavigate();
  const { isAuthenticated, isPending } = useSessionFetch();
  const [pageState, setPageState] = useState<"error" | "success" | "pending">("pending");

  useEffect(() => {
    if (isPending) return setPageState("pending");

    if (!isAuthenticated) return redirect(URLS.SIGNIN);

    setPageState("success");
  }, [isAuthenticated, isPending, redirect]);

  if (pageState === "pending") return <LoadingScreen />;

  return (
    <>
      <Outlet />
    </>
  );
}
