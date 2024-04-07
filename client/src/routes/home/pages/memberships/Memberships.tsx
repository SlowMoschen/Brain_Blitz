import DoneIcon from "@mui/icons-material/Done";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Stack,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import CallToAction from "../../../../shared/components/buttons/CallToAction";
import { memberships } from "./content";

interface MembershipCardProps {
  title: string;
  price: string;
  features: string[];
  bgcolor: string;
  isAvailable?: boolean;
  btnText?: string;
  btnOnClick?: () => void;
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
  btnOnClick,
}: MembershipCardProps) {
  const cardStyles = {
    m: 2,
    bgcolor: bgcolor,
    bordeRadius: ".375rem",
    minHeight: 400,
    width: "100%",
  };

  return (
    <Card sx={cardStyles}>
      <Stack alignItems={'center'} justifyContent={'center'} minHeight={400} >
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
        <CardActions onClick={btnOnClick}>
          {isAvailable && <CallToAction text={btnText || ""} />}
        </CardActions>
      </Stack>
    </Card>
  );
}

/**
 * Memberships component for the memberships page
 * Renders a list of MembershipCard components
 * @returns {JSX.Element}
 */
export default function Memberships() {
  const redirect = useNavigate();

  return (
    <>
      <Stack maxWidth={BREAKPOINTS.lg} alignItems={"center"}>
        <Typography
          variant="h4"
          sx={{ m: 2, textAlign: "center", fontWeight: 600 }}
          className="border-b-accent"
        >
          Unsere Mitgliedschaften
        </Typography>
        <Typography px={2}>
          Aktuell bieten wir ausschließlich unsere kostenlose Mitgliedschaft an, die auch dauerhaft
          verfügbar sein wird. Zusätzlich arbeiten wir derzeit an der Entwicklung einer
          Support-Mitgliedschaft, um unseren Nutzern noch mehr Vorteile und Funktionen bieten zu
          können. Darüber hinaus befindet sich auch eine Team-Mitgliedschaft in der Entwicklung, um
          Gruppen und Teams eine verbesserte Nutzungserfahrung zu ermöglichen. Sei gespannt auf
          weitere Updates und Features!
        </Typography>
      </Stack>
      <Stack direction={{ lg: "row" }} width={"100%"} alignItems={"center"} p={5}>
        {memberships.map((membership) => (
          <MembershipCard
            title={membership.title}
            price={membership.price}
            features={membership.features}
            bgcolor={membership.bgcolor}
            isAvailable={membership.isAvailable}
            btnText={membership.btnText}
            btnOnClick={() => redirect(membership.redirctUrl || "")}
            key={membership.title}
          />
        ))}
      </Stack>
    </>
  );
}
