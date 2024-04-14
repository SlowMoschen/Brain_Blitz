import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";

interface NotificationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: string[];
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
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="right"
      PaperProps={{ sx: { bgcolor: "background.secondary", minWidth: 250 } }}
    >
      <IconButton onClick={onClose} sx={{ alignSelf: 'flex-start'}}>
        <ChevronRightIcon sx={{ color: "primary.main", fontSize: 30 }} />
      </IconButton>
      <Divider orientation="horizontal" variant="fullWidth" sx={{ bgcolor: "secondary.main" }} />
      <List
        sx={{
          maxWidth: "100%",
        }}
      >
        <ListItem sx={{ p: 2 }}>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography variant="h6">Benachrichtigungen</Typography>
            <ListItemButton onClick={() => onDeleteAll()}>
              <DeleteForeverIcon sx={{ color: 'primary.main' }} />
            </ListItemButton>
          </Stack>
        </ListItem>
        {notifications && notifications?.length > 0 ? (
          notifications.reverse().map((notification, index) => (
            <ListItem
              key={index}
              sx={{
                color: "black",
                bgcolor: "gold",
                p: 2,
                my: 1,
                cursor: "pointer",
                "&:hover": { bgcolor: "error.light" },
              }}
              onClick={() => onNotificationDelete(index)}
            >
              {notification}
            </ListItem>
          ))
        ) : (
          <ListItem>Keine Benachrichtigungen</ListItem>
        )}
      </List>
    </Drawer>
  );
}
