import { AppBar, Box, IconButton, ListItem, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../shared/components/Logo";
import RouterButton from "../../../shared/components/buttons/RouterButton";
import SecondaryButton from "../../../shared/components/buttons/SecondaryButton";
import CallToAction from "../../../shared/components/buttons/CallToAction";
import MenuIcon from "@mui/icons-material/Menu";
import useToggle from "../../../shared/hooks/useToggle";
import { BREAKPOINTS } from "../../../configs/Breakpoints";
import useScreenSize from "../../../shared/hooks/useScreenSize";

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

const defaultNavbarStyles = {
  bgcolor: "background.secondary",
  position: "sticky",
};

function NavMenu() {
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <ListItem sx={{ p: 0, textAlign: 'center'}}>
        <Link to="/">
          <Logo maxHeight="50px" maxWidth="150px" />
        </Link>
      </ListItem>
      {defaultMenuItems.map((item, index) => (
        <ListItem key={index} sx={{ p: 0, textAlign: 'center'}}>
          <RouterButton to={item.to} text={item.text} color="secondary" />
        </ListItem>
      ))}
    </Box>
  );
}

function AuthMenu() {
  const redirect = useNavigate();
  const { width } = useScreenSize();

  const defaultStyles = {
    mx: 1,
    width: width >= BREAKPOINTS.sm ? "auto" : "100%",
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SecondaryButton
        text="Login"
        onClick={() => redirect("/auth/login")}
        sx={{ ...defaultStyles }}
      />
      <CallToAction
        text="Anmelden"
        onClick={() => redirect("/auth/register")}
        sx={{ ...defaultStyles }}
      />
    </Box>
  );
}

function Navbar() {
  return (
    <AppBar sx={{ ...defaultNavbarStyles, minHeight: '5rem', justifyContent: 'center'}}>
      <Toolbar>
        <NavMenu />
        <AuthMenu />
      </Toolbar>
    </AppBar>
  );
}

function MobileNavbar() {
  const [isOpen, toggleIsOpen] = useToggle();

  return (
    <AppBar sx={{ ...defaultNavbarStyles }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton onClick={() => toggleIsOpen()}>
          <MenuIcon sx={{ color: "secondary.main", fontSize: '2rem' }} />
        </IconButton>
        <AuthMenu />
        {isOpen && (
          <Box position={'absolute'}>
            <NavMenu />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export { MobileNavbar, Navbar };
