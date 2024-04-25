import { Divider, IconButton, Typography } from "@mui/material";
import ContainerWithHeader from "../../components/ContainerWithHeader";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import DetailsForm from "./components/DetailsForm";
import PasswordForm from "./components/PasswordForm";
import ProfileStats from "./components/ProfileStats";
import DeleteAccount from "./components/DeleteAccount";
import { useDocumentTitle } from "../../../../shared/hooks/useDocumentTitle.hook";
import BugReportIcon from '@mui/icons-material/BugReport';
import useToggle from "../../../../shared/hooks/useToggle.hook";
import ReportForm from "../../../../shared/components/form/ReportForm";

export default function UserProfile() {
  useDocumentTitle("Dashboard - Profil");
  const [isReportModalOpen, toggleReportModal] = useToggle(false);
  return (
    <>
      <HeaderMenu />
      <ContainerWithHeader header="Profil Details" sx={{ my: 5, mb: 10, position: 'relative' }}>
        <IconButton onClick={toggleReportModal} sx={{ position: 'absolute', m: 1 }}>
          <BugReportIcon sx={{ color:"text.main"}} />
          <Typography variant="caption" color='text.main'>Bug melden</Typography>
        </IconButton>
        <ProfileStats />
        <Divider orientation="horizontal" variant="middle" sx={{ bgcolor: "secondary.main" }} />
        <DetailsForm />
        <Divider orientation="horizontal" variant="middle" sx={{ bgcolor: "secondary.main" }} />
        <PasswordForm />
        <Divider orientation="horizontal" variant="middle" sx={{ bgcolor: "secondary.main" }} />
        <DeleteAccount />
      </ContainerWithHeader>
      <ReportForm
       isOpen={isReportModalOpen} 
        onClose={toggleReportModal}
        header="Du hast einen Bug gefunden? Lass es uns wissen!"
        problemSelectList={[
          "Ich habe einen Fehler gefunden",
          "Ich habe einen Verbesserungsvorschlag",
          "Ich habe eine Frage",
          "Ich habe ein anderes Problem"
        ]}
        problemLabel="Was ist das Problem?"
        problemHelperText="Wähle eine Kategorie aus"
       />
    </>
  );
}
