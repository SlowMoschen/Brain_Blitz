import { Box, ListItem } from "@mui/material";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import RouterButton from "../../../../shared/components/buttons/RouterButton";
import useScreenSize from "../../../../shared/hooks/useScreenSize";

const defaultMenuItems = [
  {
    text: "Home",
    to: "/",
  },
  {
    text: "F A Q",
    to: "/faq",
  },
  {
    text: "Mitgliedschaften",
    to: "/memberships",
  },
  {
    text: "Über uns",
    to: "/about",
  },
];

export default function NavMenu() {
  const { width } = useScreenSize();

  const isMobile = width <= BREAKPOINTS.md;
  const isDesktop = width > BREAKPOINTS.lg;

  const BoxStyles = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: isMobile ? "center" : "space-evenly",
    alignItems: "center",
    width: "100%",
    p: isMobile ? 2 : 0,
  };

  const ListItemStyles = {
    p: 0,
    textAlign: "center",
    width: "fit-content",
  };

  const fontSize = isDesktop ? "1.2rem" : "1rem";

  return (
    <Box sx={{ ...BoxStyles }}>
      {defaultMenuItems.map((item, index) => (
        <ListItem key={index} sx={{ ...ListItemStyles }}>
          <RouterButton to={item.to} text={item.text} color="text" sx={{ fontSize }} />
        </ListItem>
      ))}
    </Box>
  );
}
