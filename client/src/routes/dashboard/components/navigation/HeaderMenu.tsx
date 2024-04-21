import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppBar, Badge, IconButton, Stack, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import Logo from "../../../../shared/components/Logo";
import useToggle from "../../../../shared/hooks/useToggle.hook";
import NotificationMenu from "./NotificationMenu";
import { IOutletContext } from "../../DashboardLayout";
import { useOutletContext } from "react-router-dom";

interface HeaderMenuProps {
  tabs?: string[];
  onChange?: (_e: React.ChangeEvent<object>, newValue: number) => void;
  value?: number;
}

export default function HeaderMenu({ tabs = [], onChange, value }: HeaderMenuProps) {
  const [isMenuOpen, toggleMenuOpen] = useToggle(false);
  const [gotNotifications, setGotNotifications] = useState<boolean>(true); // initial true - to hidde the badge
  const { notifications, setNotifications } = useOutletContext<IOutletContext>();

  const handleNotificationDelete = (index: number) => {
    setNotifications((prev) => {
      const newNotifications = [...prev];
      newNotifications.splice(index, 1);
      if (newNotifications.length === 0) toggleMenuOpen();
      return newNotifications;
    });
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    setGotNotifications(true);
    toggleMenuOpen();
  };

  useEffect(() => {
    if (notifications.length > 0) {
      setGotNotifications(false);
    }
  }, [notifications]);

  useEffect(() => {
    if (notifications.length > 0) {
      setGotNotifications(false);
    } else {
      setGotNotifications(true);
    }
  }, [isMenuOpen]);

  return (
    <AppBar position="sticky" sx={{ bgcolor: "background.secondary", py: 2, px: 4, top: 0 }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Logo maxWidth="180px" maxHeight="50px" />
        <IconButton onClick={toggleMenuOpen}>
          <Badge color="error" variant="dot" invisible={gotNotifications}>
            <NotificationsIcon sx={{ color: "text.main" }} />
          </Badge>
        </IconButton>
      </Stack>
      <NotificationMenu
        isOpen={isMenuOpen}
        onClose={toggleMenuOpen}
        notifications={notifications}
        onNotificationDelete={handleNotificationDelete}
        onDeleteAll={deleteAllNotifications}
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
