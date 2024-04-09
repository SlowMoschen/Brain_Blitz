import { Box, Menu } from "@mui/material";
import { useEffect, useState } from "react";

interface NotificationMenuProps {
  isOpen: boolean;
  anchorEl: HTMLButtonElement;
  onClose: () => void;
  notifications: string[] | undefined;
}

export default function NotificationMenu({
  isOpen,
  anchorEl,
  onClose,
  notifications: notificationArr,
}: NotificationMenuProps) {
  const [notifications, setNotifications] = useState(notificationArr);

  const deleteNotification = (index: number) => {
    if (notificationArr) {
      const newNotifications = [...notificationArr];
      newNotifications.splice(index, 1);
      return setNotifications(newNotifications);
    }
  };

  useEffect(() => {
    setNotifications(notificationArr);
  }, [notificationArr]);

  return (
    <Menu id="notifications-button" anchorEl={anchorEl} open={isOpen} onClose={onClose}>
      <Box p={2}>
        {notifications && notifications?.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} style={{ color: "black" }} onClick={() => deleteNotification(index)}>
              {notification}
            </div>
          ))
        ) : (
          <div style={{ color: "black" }}>No notifications</div>
        )}
      </Box>
    </Menu>
  );
}