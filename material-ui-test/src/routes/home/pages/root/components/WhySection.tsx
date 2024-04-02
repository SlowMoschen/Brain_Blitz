import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Typography } from "@mui/material";
import useScreenSize from "../../../../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../../../../configs/Breakpoints";

interface WhyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function WhyCard({ icon, title, description }: WhyCardProps) {
  const cardStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    bgcolor: "primary.light",
    m: 1,
    p: 5,
    minHeight: "450px",
    width: '100%',
    borderRadius: ".375rem",
  };

  const titleStyles = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    borderBottom: "8px solid",
    borderColor: "accent.light",
    textAlign: "center",
    width: "75%",
  };

  return (
    <Box sx={{ ...cardStyles }}>
      {icon}
      <Typography variant="h5" sx={{ ...titleStyles }}>
        {title}
      </Typography>
      <Typography textAlign={'center'}>{description}</Typography>
    </Box>
  );
}

export default function WhySection() {
  const { width } = useScreenSize();

  const isMobile = width < BREAKPOINTS.lg;

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    p: 5,
    m: 10
  };

  const cardContainerStyles = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "2rem",
    width: "100%",
    mt: 2,
    px: isMobile ? 0 : 5,
  };

  return (
    <Box sx={{ ...containerStyles }}>
      <Typography variant="h4" fontWeight={500} textAlign={'center'}>
        Warum Brain Blitz?
      </Typography>
      <Box sx={{ ...cardContainerStyles }}>
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
      </Box>
    </Box>
  );
}
