import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import CallToAction from "../../../../shared/components/buttons/CallToAction";
import { memberships } from "./content";
import useScreenSize from "../../../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";

export interface MembershipCardProps {
  title: string;
  price: string;
  features: string[];
  bgcolor: string;
  isAvailable?: boolean;
  btnText?: string;
}

/**
 * MembershipCard component 
 * Renders a card with membership information
 * @param {MembershipCardProps} props
 * @returns {JSX.Element}
 */
function MembershipCard({
  title,
  price,
  features,
  bgcolor,
  isAvailable,
  btnText,
}: MembershipCardProps) {
  const cardStyles = {
    m: 2,
    bgcolor: bgcolor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bordeRadius: ".375rem",
    minHeight: 400,
    width: "100%",
  };

  return (
    <Card sx={{ ...cardStyles }}>
      <CardHeader title={title} subheader={price} sx={{ textAlign: "center" }} />
      <CardContent>
        <List>
          {isAvailable ? (
            features.map((feature) => (
              <ListItem key={feature}>
                <DoneIcon sx={{ color: "accent.main", mr: 1 }} />
                {feature}
              </ListItem>
            ))
          ) : (
            <ListItem sx={{ color: "accent.main" }}>In Entwicklung</ListItem>
          )}
        </List>
      </CardContent>
      <CardActions>{isAvailable && <CallToAction text={btnText || ""} />}</CardActions>
    </Card>
  );
}


/**
 * Memberships component for the memberships page
 * Renders a list of MembershipCard components
 * @returns {JSX.Element}
 */
export default function Memberships() {
  const { width } = useScreenSize();
  const isMobile = width <= BREAKPOINTS.md;

  const containerStyles = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "center",
    alignItems: "center",
    p: 5,
    width: "100%",
  };

  return (
    <>
      <Box sx={{ maxWidth: BREAKPOINTS.lg, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ m: 2, textAlign: "center", fontWeight: 600 }} className="border-b-accent">
          Unsere Mitgliedschaften
        </Typography>
        <Typography px={2}>
          Aktuell bieten wir ausschließlich unsere kostenlose Mitgliedschaft an, die auch dauerhaft
          verfügbar sein wird. Zusätzlich arbeiten wir derzeit an der Entwicklung einer
          Support-Mitgliedschaft, um unseren Nutzern noch mehr Vorteile und Funktionen bieten zu
          können. Darüber hinaus befindet sich auch eine Team-Mitgliedschaft in der Entwicklung, um
          Gruppen und Teams eine verbesserte Nutzungserfahrung zu ermöglichen. Sei gespannt
          auf weitere Updates und Features!
        </Typography>
      </Box>
      <Box sx={{ ...containerStyles }}>
        {memberships.map((membership) => (
          <MembershipCard
            title={membership.title}
            price={membership.price}
            features={membership.features}
            bgcolor={membership.bgcolor}
            isAvailable={membership.isAvailable}
            btnText={membership.btnText}
          />
        ))}
      </Box>
    </>
  );
}
