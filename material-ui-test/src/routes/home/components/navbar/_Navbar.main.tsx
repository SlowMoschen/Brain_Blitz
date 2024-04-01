import { AppBar, Toolbar } from "@mui/material";
import NavMenu from "./NavMenu";
import AuthMenu from "./AuthMenu";
import { defaultNavbarStyles } from "./navbar.styles";

export default function Navbar() {
  return (
    <AppBar sx={{ ...defaultNavbarStyles, minHeight: '5rem', justifyContent: 'center'}}>
      <Toolbar>
        <NavMenu />
        <AuthMenu />
      </Toolbar>
    </AppBar>
  );
}
