import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CallToAction from "../../../../shared/components/buttons/CallToAction";
import SecondaryButton from "../../../../shared/components/buttons/SecondaryButton";
import { useQuizRedirect } from "../../../../shared/hooks/game/useQuizRedirect.hook";
import { INotification } from "../../../../shared/types/ServerEvents";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: INotification;
}

export default function NotificationModal({ data, isOpen, onClose }: NotificationModalProps) {
  const handleQuizRedirect = useQuizRedirect();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      scroll="paper"
      PaperProps={{ sx: { bgcolor: "background.secondary" } }}
    >
      <DialogTitle align="center" fontSize={30}>
        {data.topic}
      </DialogTitle>
      <DialogContent>
        {data.notificationData?.messageBlocks?.map((block, index) => (
          <Stack key={index} my={2} px={2}>
            <Typography variant="h6" color="text.primary" align="left">
              {block.header}
            </Typography>
            <Divider
              orientation="horizontal"
              variant="fullWidth"
              sx={{ bgcolor: "secondary.main" }}
            />
            <Typography variant="body2" color="text.primary" align="left" my={2}>
              {block.body}
            </Typography>
          </Stack>
        ))}
      </DialogContent>
      <DialogActions>
        {data.notificationData.quiz && data.type === "unlock" ? (
          <>
            <SecondaryButton onClick={onClose} text="Schließen" />
            <CallToAction
              onClick={() => {
                onClose();
                handleQuizRedirect(data.notificationData.quiz?.id ?? "");
              }}
              text="Spielen"
              sx={{ px: 4 }}
            />
          </>
        ) : (
          <CallToAction onClick={onClose} text="Schließen" />
        )}
      </DialogActions>
    </Dialog>
  );
}
