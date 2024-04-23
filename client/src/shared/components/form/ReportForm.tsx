import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutationFactory } from "../../hooks/api/_useMutationFactory";
import useToggle from "../../hooks/useToggle.hook";
import AlertSnackbar from "../AlertSnackbar";
import CallToAction from "../buttons/CallToAction";
import InputSelect from "./InputSelect";
import InputText from "./InputText";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { URLS } from "../../../configs/Links";

interface ReportFormProps {
  header: string;
  problemLabel?: string;
  problemHelperText?: string;
  problemSelectList: string[];
  isOpen: boolean;
  id?: string;
  onClose: () => void;
}

interface IFormInput {
  problem: string;
  description: string;
  id?: string;
}

export default function ReportForm({
  header,
  problemLabel,
  problemHelperText,
  problemSelectList,
  id,
  isOpen,
  onClose,
}: ReportFormProps) {
  const [isSnackbarOpen, toggleSnackbarOpen] = useToggle(false);
  const [snackBarProps, setSnackbarProps] = useState<{
    message: string;
    alertType: "success" | "error";
  }>({
    message: "",
    alertType: "success",
  });

  const schema = z.object({
    problem: z.string().min(1, { message: "Bitte wähle ein Problem aus." }),
    description: z
      .string()
      .min(10, { message: "Beschreibung muss mindestens 10 Zeichen lang sein." }),
  });

  const defaultValues: IFormInput = {
    problem: problemSelectList[0] || "Problem auswählen",
    description: "",
  };

  const { control, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSuccess = () => {
    toggleSnackbarOpen();
    setSnackbarProps({
      message: "Deine Nachricht wurde erfolgreich versendet.",
      alertType: "success",
    });
    reset();
  };

  const onError = (error: string) => {
    toggleSnackbarOpen();
    setSnackbarProps({
      message: "Es ist ein Fehler aufgetreten.",
      alertType: "error",
    });
    console.error(error);
  };

  const { mutate } = useMutationFactory({
    endpoint: URLS.API_ENDPOINTS.APP.REPORT,
    method: "post",
    onSuccess: onSuccess,
    onError: onError,
  });

  const onSubmit = (data: IFormInput) => {
    if (id) {
      mutate({ ...data, id });
    } else {
      mutate(data);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        fullWidth
        PaperProps={{
          component: "form",
          sx: {
            bgcolor: "background.secondary",
            borderRadius: ".375rem",
          },
          onSubmit: handleSubmit(onSubmit),
        }}
        onClose={onClose}
      >
        <DialogTitle>{header}</DialogTitle>
        <DialogContent>
          <InputSelect
            control={control}
            name={"problem"}
            label={problemLabel}
            options={problemSelectList}
            helperText={problemHelperText}
          />
          <InputText
            type="text"
            control={control}
            name={"description"}
            label={"Beschreibung"}
            multiline
            rows={4}
          />
          <CallToAction type="submit" text="Absenden" fullWidth />
        </DialogContent>
      </Dialog>
      <AlertSnackbar
        open={isSnackbarOpen}
        message={snackBarProps.message}
        alertType={snackBarProps.alertType}
        onClose={toggleSnackbarOpen}
      />
    </>
  );
}
