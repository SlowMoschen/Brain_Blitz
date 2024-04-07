import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { URLS } from "../../configs/Links";
import LoadingScreen from "../../shared/components/LoadingScreen";
import ScrollToTop from "../../shared/components/ScrollToTop";
import { useUser } from "../../shared/hooks/api/useUser.hook";
import { UserContext } from "../../shared/types/User";
import BottomMenu from "./components/navigation/BottomMenu";

export default function DashboardLayout() {
  const redirect = useNavigate();
  const { user, isPending, isError, noAccess } = useUser();

  if (isPending) return (
    <LoadingScreen />
  )

  if (isError) {
    if (noAccess) return redirect(URLS.SIGNIN);

    return (
      <Box>
        <h1>Something went wrong</h1>
      </Box>
    )
  }

  return (
    <>
      <ScrollToTop />
      <Box>
        <Outlet context={{ user } satisfies UserContext}/>
      </Box>
      <BottomMenu />
    </>
  );
}
