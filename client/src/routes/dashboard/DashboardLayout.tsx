import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { URLS } from "../../configs/Links";
import LoadingScreen from "../../shared/components/LoadingScreen";
import ScrollToTop from "../../shared/components/ScrollToTop";
import { useUserFetch } from "../../shared/hooks/api/useUserFetch.hook";
import { UserContext } from "../../shared/types/User";
import BottomMenu from "./components/navigation/BottomMenu";

export default function DashboardLayout() {
  const redirect = useNavigate();
  const [pageState, setPageState] = useState<"error" | "success" | "pending">("pending");
  const { user, isPending, isError, noAccess } = useUserFetch();

  useEffect(() => {
    if (isPending) return setPageState("pending");

    if (isError) {
      if (noAccess) return redirect(URLS.SIGNIN);

      return setPageState("error");
    }

    setPageState("success");
  }, [isPending, isError, noAccess]);

  return (
    <>
      <ScrollToTop />
      <Box>
        {pageState === "pending" ? (
          <LoadingScreen />
        ) : pageState === "error" ? (
          <Box>Error</Box>
        ) : (
          <Outlet context={{ user } satisfies UserContext} />
        )}
      </Box>
      <BottomMenu />
    </>
  );
}
