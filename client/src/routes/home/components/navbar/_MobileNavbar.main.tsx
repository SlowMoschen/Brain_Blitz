import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import useToggle from "../../../../shared/hooks/useToggle.hook";
import AuthMenu from "./AuthMenu";
import NavMenu from "./NavMenu";
import { defaultNavbarStyles } from "./navbar.styles";
import Logo from "../../../../shared/components/Logo";

export default function MobileNavbar() {
  const [isOpen, toggleIsOpen] = useToggle();

  const drawerStyles = {
    position: "absolute",
    top: "100%",
    left: isOpen ? 0 : "-100%",
    width: "100%",
    bgcolor: "background.secondary",
    transition: "left",
    transitionDuration: "300ms",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <AppBar sx={{ ...defaultNavbarStyles }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={() => toggleIsOpen()}>
          <MenuIcon sx={{ color: "secondary.main", fontSize: "2rem" }} />
        </IconButton>
        <AuthMenu />
        <Box sx={{ ...drawerStyles }}>
          <Logo maxWidth="150px" />
          <NavMenu toggleIsOpen={toggleIsOpen} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
