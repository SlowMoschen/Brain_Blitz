import { Divider } from "@mui/material";
import ContainerWithHeader from "../../components/ContainerWithHeader";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import DetailsForm from "./components/DetailsForm";
import PasswordForm from "./components/PasswordForm";
import ProfileStats from "./components/ProfileStats";
import DeleteAccount from "./components/DeleteAccount";
import { useDocumentTitle } from "../../../../shared/hooks/api/useDocumentTitle.hook";

export default function Profile() {
  useDocumentTitle("Dashboard - Profil");
  return (
    <>
      <HeaderMenu />
      <ContainerWithHeader header="Profil Details" sx={{ my: 5, mb: 10 }}>
        <ProfileStats />
        <Divider orientation="horizontal" variant="middle" sx={{ bgcolor: "secondary.main" }} />
        <DetailsForm />
        <Divider orientation="horizontal" variant="middle" sx={{ bgcolor: "secondary.main" }} />
        <PasswordForm />
        <Divider orientation="horizontal" variant="middle" sx={{ bgcolor: "secondary.main" }} />
        <DeleteAccount />
      </ContainerWithHeader>
    </>
  );
}
