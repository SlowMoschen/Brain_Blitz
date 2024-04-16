import { Box, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { URLS } from "../../configs/Links";
import LoadingScreen from "../../shared/components/LoadingScreen";
import ScrollToTop from "../../shared/components/ScrollToTop";
import { UserIDContext } from "../../shared/context/UserID.context";
import { useSocket } from "../../shared/hooks/api/useSocket.hook";
import { useUserQueries } from "../../shared/hooks/api/useUserQueries.hook";
import { NewQuizUnlockedEvent } from "../../shared/types/ServerEvents";
import { IUser } from "../../shared/types/User";
import BottomMenu from "./components/navigation/BottomMenu";

export interface IOutletContext {
  user: IUser;
  notifications: string[];
  setNotifications: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function DashboardLayout() {
  const [pageState, setPageState] = useState<"error" | "success" | "pending">("pending");
  const [notifications, setNotifications] = useState<string[]>([]);
  const { user, isPending, isError, noAccess } = useUserQueries().useUserFetch();
  const { setUserID } = useContext(UserIDContext);
  const { pathname } = useLocation();
  const redirect = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    if (isPending) return setPageState("pending");

    if (isError) {
      if (noAccess) return redirect(URLS.SIGNIN);

      return setPageState("error");
    }

    setPageState("success");
    setUserID(user.id);

    if (socket) {
      socket.connect();

      socket.emit("init", { user_id: user.id });

      socket.on("quiz.unlocked", (data: NewQuizUnlockedEvent) => {
        setNotifications((prev) => [...prev, `Neues Quiz freigeschaltet: ${data.title}`]);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [isPending, isError, noAccess]);

  return (
    <>
      <ScrollToTop />
      <Stack alignItems={"center"} position={"relative"} width={"100%"}>
        {pageState === "pending" ? (
          <LoadingScreen />
        ) : pageState === "error" ? (
          <Box>Error</Box>
        ) : (
          <Outlet
            context={{
              user: user as IUser,
              notifications,
              setNotifications,
            }}
          />
        )}
      </Stack>
      {pathname.includes("/dashboard/quiz") ? null : <BottomMenu />}
    </>
  );
}
