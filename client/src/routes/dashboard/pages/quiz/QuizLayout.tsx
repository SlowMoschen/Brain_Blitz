import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { URLS } from "../../../../configs/Links";
import LoadingScreen from "../../../../shared/components/LoadingScreen";
import { useAuthQueries } from "../../../../shared/hooks/api/useAuthQueries.hook";

export default function QuizLayout() {
  const redirect = useNavigate();
  const { isAuthenticated, isPending } = useAuthQueries().useSessionCheck();
  const [pageState, setPageState] = useState<"error" | "success" | "pending">("pending");

  useEffect(() => {
    if (isPending) return setPageState("pending");

    if (!isAuthenticated) return redirect(URLS.SIGNIN);

    setPageState("success");
  }, [isAuthenticated, isPending, redirect]);

  if (pageState === "pending") return <LoadingScreen />;

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
