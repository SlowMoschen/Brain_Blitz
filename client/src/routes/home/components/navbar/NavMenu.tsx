import { Box, ListItem } from "@mui/material";
import { useContext } from "react";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import RouterButton from "../../../../shared/components/buttons/RouterButton";
import { WindowContext } from "../../../../shared/context/ScreenSize.context";

const defaultMenuItems = [
  {
    text: "Startseite",
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

interface NavMenuProps {
  // Function to toggle the mobile menu
  toggleIsOpen?: () => void;
}

export default function NavMenu({ toggleIsOpen }: NavMenuProps) {
  const { width } = useContext(WindowContext);

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
          <RouterButton to={item.to} text={item.text} color="text" sx={{ fontSize }} onClick={toggleIsOpen} />
        </ListItem>
      ))}
    </Box>
  );
}
