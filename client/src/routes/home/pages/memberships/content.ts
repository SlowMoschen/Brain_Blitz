import { URLS } from "../../../../configs/Links";

interface memberships {
  title: string;
  price: string;
  features: string[];
  bgcolor: string;
  isAvailable?: boolean;
  btnText?: string;
  redirctUrl?: string;
}

export const memberships: memberships[] = [
  {
    title: "Basic",
    price: "Gratis",
    features: ["unbegrenztes spielen von Quizzes", "Highscores werden gespeichert", "Ranglisten"],
    bgcolor: "background.secondary",
    isAvailable: true,
    btnText: "Jetzt anmelden",
    redirctUrl: URLS.SIGNUP,
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
