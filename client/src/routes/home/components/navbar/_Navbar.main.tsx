import { AppBar, Toolbar } from "@mui/material";
import NavMenu from "./NavMenu";
import AuthMenu from "./AuthMenu";
import { defaultNavbarStyles } from "./navbar.styles";
import Logo from "../../../../shared/components/Logo";

export default function Navbar() {
  return (
    <AppBar
      sx={{
        ...defaultNavbarStyles,
        minHeight: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
      >
        <Logo maxWidth="150px" />
        <NavMenu />
        <AuthMenu />
      </Toolbar>
    </AppBar>
  );
}
