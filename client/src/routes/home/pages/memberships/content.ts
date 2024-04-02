import { MembershipCardProps } from "./Memberships";

export const memberships: MembershipCardProps[] = [
  {
    title: "Basic",
    price: "Gratis",
    features: ["unbegrenztes spielen von Quizzes", "Highscores werden gespeichert", "Ranglisten"],
    bgcolor: "background.secondary",
    isAvailable: true,
    btnText: "Jetzt anmelden",
  },
  {
    title: "Supporter",
    price: "TBA",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    bgcolor: "primary.light",
  },
  {
    title: "Team",
    price: "TBA",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    bgcolor: "background.secondary",
  },
];
