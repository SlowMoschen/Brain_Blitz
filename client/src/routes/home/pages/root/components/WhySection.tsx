import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Stack, Typography } from "@mui/material";

interface WhyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * This component is responsible for rendering a card with an icon, title, and description.
 * The card contains information about why the user should use the application.
 * The component is responsive and displays the card in a column on mobile devices.
 * The card has a title, description, and an icon.
 */
function WhyCard({ icon, title, description }: WhyCardProps) {
  const card = {
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    bgcolor: "primary.light",
    m: 1,
    minHeight: "450px",
    width: "100%",
    borderRadius: ".375rem",
  };

  const header = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    borderBottom: "8px solid",
    borderColor: "accent.light",
    textAlign: "center",
    width: "75%",
  };

  return (
    <Stack sx={card}>
      {icon}
      <Typography variant="h5" sx={header}>
        {title}
      </Typography>
      <Typography textAlign={"center"}>{description}</Typography>
    </Stack>
  );
}

/**
 * This is the main component that renders the why section.
 * It displays three cards with icons, titles, and descriptions.
 */
export default function WhySection() {
  const mainContainer = {
    alignItems: "center",
    width: "100%",
    p: 5,
    m: 10,
  };

  const cardContainer = {
    flexDirection: { xs: "column", lg: "row" },
    alignItems: "center",
    gap: "2rem",
    width: "100%",
    mt: 2,
    px: { xs: 0, lg: 5 },
  };

  return (
    <Stack sx={mainContainer}>
      <Typography variant="h4" fontWeight={500} textAlign={"center"}>
        Warum Brain Blitz?
      </Typography>
      <Stack sx={cardContainer}>
        <WhyCard
          icon={<LocalLibraryOutlinedIcon className="enlarged-icon" />}
          title="Wissen erweitern"
          description="Spielerisch Wissen in verschiedenen Kategorien erweitern!"
        />
        <WhyCard
          icon={<LocationOnOutlinedIcon className="enlarged-icon" />}
          title="Jederzeit und überall"
          description="Lernen leicht gemacht, überall und jederzeit!"
        />
        <WhyCard
          icon={<CastForEducationOutlinedIcon className="enlarged-icon" />}
          title="Bildung und Unterhaltung kombiniert"
          description="Faszinierende Fakten entdecken, Bildung und Unterhaltung vereint!"
        />
      </Stack>
    </Stack>
  );
}
