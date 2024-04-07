import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../../shared/components/LoadingScreen";
import ScrollToTop from "../../shared/components/ScrollToTop";
import { useUser } from "../../shared/hooks/api/useUser.hook";
import { UserContext } from "../../shared/types/User";
import { useContext } from "react";
import { WindowContext } from "../../shared/context/ScreenSize.context";
import BottomMenu from "./components/navbar/BottomMenu";
import { BREAKPOINTS } from "../../configs/Breakpoints";

export default function DashboardLayout() {
  const { user, isPending, isError } = useUser();
  const { width } = useContext(WindowContext);

  if (isPending) return (
    <LoadingScreen />
  )

  if (isError) return (
    <div>Something went wrong...</div>
  )

  return (
    <>
      <ScrollToTop />
      <Box>
        <Outlet context={{ user } satisfies UserContext}/>
      </Box>
      {
        width <= BREAKPOINTS.md && (
          <BottomMenu />
        )
      }
    </>
  );
}
