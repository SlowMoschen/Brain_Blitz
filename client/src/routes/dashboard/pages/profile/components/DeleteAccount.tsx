import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import SecondaryButton from "../../../../../shared/components/buttons/SecondaryButton";
import { useUserQueries } from "../../../../../shared/hooks/api/useUserQueries.hook";
import useToggle from "../../../../../shared/hooks/useToggle.hook";

export default function DeleteAccount() {
  const [isModalOpen, toggleModal] = useToggle(false);
  const { mutate: deleteUser } = useUserQueries().useDeleteUserFetch();

  return (
    <Stack p={2}>
      <Typography variant="h5" mb={2}>
        Account löschen
      </Typography>
      <Typography variant="caption" mb={2}>
        Wenn du deinen Account löschst, werden alle deine Daten unwiderruflich gelöscht.
      </Typography>
      <Box>
        <CallToAction onClick={toggleModal} text="Account löschen" size="large" />
      </Box>
      <Dialog
        open={isModalOpen}
        onClose={toggleModal}
        PaperProps={{ sx: { bgcolor: "background.secondary" } }}
      >
        <DialogTitle>Account löschen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bist du sicher, dass du deinen Account löschen möchtest? Diese Aktion kann nicht
            rückgängig gemacht werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={toggleModal} text="Abbrechen" />
          <CallToAction onClick={() => deleteUser(undefined)} text="Account löschen" autoFocus />
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
