import clsx from "clsx";
import Article from "../../../../shared/components/Article";
import useScreenSize from "../../../../shared/hooks/useScreenSize";
import MembershipCard from "./MembershipCard";
import { BREAKPOINTS } from "../../../../shared/constants/breakpoints";
import { useNavigate } from "react-router-dom";

export default function Memberships() {

    const screenSize = useScreenSize();
    const redirect = useNavigate();

    const defaultFeatures = [
        "unbegrenztes spielen von Quizzes",
        "Highscores werden gespeichert",
        "Ranglisten",
    ];

    const memberships = [
        {
            title: "Basic",
            price: "Gratis",
            features: defaultFeatures,
            btnOnClick: () => redirect('/auth/register'),
            btnText: "Jetzt loslegen",
            isAvailable: true
        },
        {
            title: "Support",
            price: "TBA",
            features: [...defaultFeatures, "Priorisierter Support"],
            btnOnClick: () => {},
            btnText: "Jetzt beitreten",
            isAvailable: false
        },
        {
            title: "Team",
            price: "TBA",
            features: [...defaultFeatures, "Team-Features"],
            btnOnClick: () => {},
            btnText: "Jetzt beitreten",
            isAvailable: false
        }
    ];

  return (
    <>
      <Article
        title={{ content: "Unsere Mitgliedschaften", border_b: true }}
        para1="
        Aktuell bieten wir ausschließlich unsere kostenlose Mitgliedschaft an, die auch dauerhaft verfügbar sein wird. Zusätzlich arbeiten wir derzeit an der Entwicklung einer Support-Mitgliedschaft, um unseren Nutzern noch mehr Vorteile und Funktionen bieten zu können. Darüber hinaus befindet sich auch eine Team-Mitgliedschaft in der Entwicklung, um Gruppen und Teams eine verbesserte Nutzungserfahrung zu ermöglichen. Bleiben Sie gespannt auf weitere Updates und Features!"
      />
      <div className={clsx(
        'w-full my-10',
        screenSize.width >= BREAKPOINTS.lg ? 'grid grid-cols-3' : 'flex flex-col'
      )}>
        {memberships.map((membership, index) => (
            <MembershipCard key={index} containerBGColor="bg-bg-secondary" title={membership.title} price={membership.price} features={membership.features} btnOnClick={membership.btnOnClick} btnText={membership.btnText} isAvailable={membership.isAvailable} />
        ))}
      </div>
    </>
  );
}
