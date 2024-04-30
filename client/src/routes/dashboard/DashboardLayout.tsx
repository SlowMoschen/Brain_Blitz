import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { URLS } from "../../configs/Links";
import LoadingScreen from "../../shared/components/LoadingScreen";
import ScrollToTop from "../../shared/components/ScrollToTop";
import { useUserQuery } from "../../shared/hooks/api/useUserAPI.hook";
import { useSocketContext } from "../../shared/hooks/context/useSocketContext.hook";
import { useUserIdContext } from "../../shared/hooks/context/useUserIdContext.hook";
import { IQuiz } from "../../shared/types/Quiz";
import { INotification } from "../../shared/types/ServerEvents";
import { IUser } from "../../shared/types/User";
import BottomMenu from "./components/navigation/BottomMenu";

export interface IOutletContext {
  user: IUser;
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function DashboardLayout() {
  const [pageState, setPageState] = useState<"error" | "success" | "pending">("pending");
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const { user, isPending, isError, noAccess } = useUserQuery({});
  const { setUserID } = useUserIdContext();
  const { pathname } = useLocation();
  const redirect = useNavigate();
  const socket = useSocketContext();

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

      socket.on(
        "quiz.unlocked",
        (
          data: INotification & {
            notificationData: { quiz: IQuiz };
          }
        ) => {
          setNotifications((prev) => [...prev, data]);
        }
      );

      socket.on("notifi.firstLogin", (data) => {
        setNotifications((prev) => [...prev, data]);
      });

      socket.on("notifi.update", (data) => {
        setNotifications((prev) => [...prev, data]);
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
      {pathname.includes("/dashboard/quiz") || pathname.includes("/dashboard/admin") ? null : (
        <BottomMenu />
      )}
    </>
  );
}
