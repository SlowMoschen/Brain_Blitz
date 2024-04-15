import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useBlocker } from "react-router-dom";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import SecondaryButton from "../../../../../shared/components/buttons/SecondaryButton";
import { useQueryClient } from "@tanstack/react-query";

export default function LeaveWarningModal() {
  const blocker = useBlocker(({ historyAction }) => {
    if (historyAction === "POP" || historyAction === "PUSH") return true;

    return false;
  });
  const queryClient = useQueryClient();

  return (
    <Dialog
      open={blocker.state === "blocked"}
      PaperProps={{ sx: { bgcolor: "background.secondary" } }}
    >
      <DialogTitle>Seite verlassen?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bist du sicher, dass du die Seite verlassen möchtest? Deine Energie wurde bereits
          abgezogen und dein Fortschritt geht verloren.
        </DialogContentText>
      </DialogContent>
    <DialogActions>
        <CallToAction onClick={blocker.reset} text="Abbrechen" />
        <SecondaryButton onClick={() => {
            blocker.proceed!();
            queryClient.invalidateQueries({ queryKey: ['user']});
        }} text="Verlassen" />
    </DialogActions>
    </Dialog>
  );
}
