import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import useToggle from "../../../../shared/hooks/useToggle";
import AuthMenu from "./AuthMenu";
import { defaultNavbarStyles } from "./navbar.styles";
import NavMenu from "./NavMenu";
import MenuIcon from "@mui/icons-material/Menu";

export default function MobileNavbar() {
  const [isOpen, toggleIsOpen] = useToggle();

  return (
    <AppBar sx={{ ...defaultNavbarStyles }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={() => toggleIsOpen()}>
          <MenuIcon sx={{ color: "secondary.main", fontSize: "2rem" }} />
        </IconButton>
        <AuthMenu />
        {isOpen && (
          <Box
            position={"absolute"}
            sx={{ top: "100%", left: "0", bgcolor: "background.secondary", width: "100%" }}
          >
            <NavMenu />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
