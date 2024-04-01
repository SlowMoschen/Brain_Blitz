import { Box, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../../../shared/components/Logo";
import RouterButton from "../../../../shared/components/buttons/RouterButton";
import useScreenSize from "../../../../shared/hooks/useScreenSize";

const defaultMenuItems = [
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

  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <ListItem sx={{ p: 0, textAlign: "center" }}>
        <Link to="/">
          <Logo maxHeight="50px" maxWidth="150px" />
        </Link>
      </ListItem>
      {defaultMenuItems.map((item, index) => (
        <ListItem key={index} sx={{ p: 0, textAlign: "center" }}>
          <RouterButton to={item.to} text={item.text} color="secondary" />
        </ListItem>
      ))}
    </Box>
  );
}
