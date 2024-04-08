import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../../../shared/types/User";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import WelcomeHeader from "./WelcomeHeader";
import LoginStreak from "../../components/LoginStreak";
import EnergyTracker from "../../components/EnergyTracker";

export default function DashboardRoot() {
  const { user } = useOutletContext<UserContext>();
  const { first_name } = user;

  return (
    <>
      <HeaderMenu />
      <WelcomeHeader name={first_name} />
      <LoginStreak streak={user.statistics.login_streak} />
      <EnergyTracker energy={user.energy} />
    </>
  );
}
