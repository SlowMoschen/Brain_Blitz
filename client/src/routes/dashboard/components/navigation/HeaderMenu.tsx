import { AppBar, Badge, IconButton, Stack, Tab, Tabs } from "@mui/material";
import Logo from "../../../../shared/components/Logo";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useRef, useState } from "react";
import NotificationMenu from "./NotificationMenu";
import useToggle from "../../../../shared/hooks/useToggle.hook";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../../../shared/types/User";
import { useCompareUserQuizzes } from "../../../../shared/hooks/useCompareUserQuizzes";

interface HeaderMenuProps {
  tabs?: string[];
  onChange?: (_e: React.ChangeEvent<object>, newValue: number) => void;
  value?: number;
}

export default function HeaderMenu({ tabs = [], onChange, value }: HeaderMenuProps) {
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const { user } = useOutletContext<UserContext>();
  const { changedQuizzes } = useCompareUserQuizzes(user);
  const [notifications, setNotifications] = useState<string[] | undefined>([]);
  const [isMenuOpen, toggleMenuOpen] = useToggle(false);
  const [gotNotifications, setGotNotifications] = useState<boolean>(true); // initial true - to hidde the badge

  const handleMenuClick = () => {
    toggleMenuOpen();
    setGotNotifications(true);
  };

  const handleMenuClose = () => {
    toggleMenuOpen();
  };

  useEffect(() => {
    if (changedQuizzes) {
      setNotifications(changedQuizzes.map((quiz) => `Du hast ${quiz} freigeschaltet!`));
      setGotNotifications(false);
    }
  }, [changedQuizzes]);

  return (
    <AppBar position="sticky" sx={{ bgcolor: "background.secondary", py: 2, px: 4, top: 0 }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Logo maxWidth="180px" maxHeight="50px" />
        <IconButton ref={notificationButtonRef} onClick={handleMenuClick}>
          <Badge color="error" variant="dot" invisible={gotNotifications}>
            <NotificationsIcon sx={{ color: "text.main" }} />
          </Badge>
        </IconButton>
      </Stack>
      <NotificationMenu
        isOpen={isMenuOpen}
        anchorEl={notificationButtonRef.current!}
        onClose={handleMenuClose}
        notifications={notifications}
      />
      {tabs.length > 0 && (
        <Tabs value={value} onChange={onChange} textColor="secondary" variant="scrollable">
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} sx={{ color: "text.main" }} />
          ))}
        </Tabs>
      )}
    </AppBar>
  );
}
