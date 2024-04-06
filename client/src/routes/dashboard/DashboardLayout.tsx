import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../../shared/components/LoadingScreen";
import ScrollToTop from "../../shared/components/ScrollToTop";
import { useUser } from "../../shared/hooks/api/useUser.hook";
import { UserContext } from "../../shared/types/User";

export default function DashboardLayout() {
  const { user, isPending, isError } = useUser();

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
    </>
  );
}
