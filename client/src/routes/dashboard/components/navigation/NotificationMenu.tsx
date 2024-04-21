import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { INotification } from "../../../../shared/types/ServerEvents";
import NotificationModal from "./NotificationModal";
import { useState } from "react";

interface NotificationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: INotification[];
  onNotificationDelete: (index: number) => void;
  onDeleteAll: () => void;
}

export default function NotificationMenu({
  isOpen,
  onClose,
  notifications,
  onNotificationDelete,
  onDeleteAll,
}: NotificationMenuProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<INotification | null>(null);
  const [notificationIndex, setNotificationIndex] = useState<number | null>(null);

  const getColor = (type: string) => {
    switch (type) {
      case "unlock":
        return "text.dark";
      case "update":
        return "text.dark";
      default:
        return "text.main";
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "unlock":
        return "gold";
      case "generic":
        return "accent.light";
      default:
        return "info.main";
    }
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="right"
      PaperProps={{ sx: { bgcolor: "background.secondary", minWidth: "30%", maxWidth: "300px" } }}
    >
      <IconButton onClick={onClose} sx={{ alignSelf: "flex-start" }}>
        <ChevronRightIcon sx={{ color: "primary.main", fontSize: 30 }} />
      </IconButton>
      <Divider orientation="horizontal" variant="fullWidth" sx={{ bgcolor: "secondary.main" }} />
      <List
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          p: 2,
          position: "relative",
        }}
      >
        <ListItem sx={{ p: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Box>
              <Typography variant="h6">Benachrichtigungen</Typography>
            </Box>
            <Box>
              <ListItemButton onClick={() => onDeleteAll()}>
                <DeleteForeverIcon sx={{ color: "primary.main", fontSize: 30 }} />
              </ListItemButton>
            </Box>
          </Stack>
        </ListItem>
        {notifications && notifications?.length > 0 ? (
          notifications.reverse().map((notification, index) => (
            <ListItem
              key={index}
              sx={{
                color: getColor(notification.type),
                bgcolor: getBgColor(notification.type),
                p: 2,
                my: 1,
                borderRadius: ".375rem",
                textWrap: "balance",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                wordWrap: "break-word",
                "&:hover": {
                  filter: "brightness(0.9)",
                },
              }}
              onClick={() => {
                setModalData(notification);
                setNotificationIndex(index);
                setIsModalOpen(true);
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onNotificationDelete(index);
                }}
                sx={{ position: "absolute", top: 0, left: 0, color: "error.main", zIndex: 100 }}
              >
                <CloseIcon />
              </IconButton>
              <Stack p={2} maxWidth={"100%"}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: { xs: "left", lg: "center" },
                    fontWeight: "bold",
                  }}
                >
                  {notification.topic}
                </Typography>
                <Typography sx={{ textAlign: { xs: "left", lg: "center" } }}>
                  {notification.notificationData?.messageBlocks[0]?.body.slice(0, 20)}...
                </Typography>
              </Stack>
            </ListItem>
          ))
        ) : (
          <ListItem>Keine Benachrichtigungen</ListItem>
        )}
      </List>
      {isModalOpen && (
        <NotificationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            onNotificationDelete(notificationIndex as number);
            setModalData(null);
            setNotificationIndex(null);
          }}
          data={modalData as INotification}
        />
      )}
    </Drawer>
  );
}
