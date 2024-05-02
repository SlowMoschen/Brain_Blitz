import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import Logo from "../../../../shared/components/Logo";
import { WindowContext } from "../../../../shared/context/ScreenSize.context";
import DrawerItem from "./components/navigation/DrawerItem";
import { listItems } from "./components/navigation/ListContent";
import { useAdminQuery } from "../../../../shared/hooks/api/useAdminAPI.hook";
import LoadingScreen from "../../../../shared/components/LoadingScreen";
import RedirectErrorPage from "../../../error/RedirectErrorPage";
import { URLS } from "../../../../configs/Links";
import { IUser } from "../../../../shared/types/User";
import { IQuiz } from "../../../../shared/types/Quiz";

export interface AdminOutletContext {
    allUsers: IUser[];
    allQuizzes: IQuiz[];
}

export default function AdminDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { width } = useContext(WindowContext);
  const isMobile = width < BREAKPOINTS.lg;
  const { allUsers, allQuizzes, isPending, isError } = useAdminQuery();
  
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(false);
  };

  const drawerWidth = isMobile ? 240 : 300;

  if (isPending) return <LoadingScreen />;

  if (isError)
    return (
      <RedirectErrorPage
        message="Kein Zugriff"
        redirectTo="zur Startseite"
        redirectUrl={URLS.HOME}
      />
    );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "background.secondary" }}
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {listItems[selectedIndex].name}
          </Typography>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={() => setIsOpen(!isOpen)}
              sx={{ ml: "auto", display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "background.secondary",
          },
        }}
        open={isOpen}
      >
        <Toolbar />
        <Toolbar sx={{ p: 2 }}>
          <Logo maxWidth="200px" />
        </Toolbar>
        <Box sx={{ overflow: "auto" }}>
          <List
            subheader={
              <ListSubheader component="div" sx={{ bgcolor: "background.secondary" }}>
                Navigation
              </ListSubheader>
            }
          >
            {listItems.map((item, index) => (
              <DrawerItem
                onClick={() => handleListItemClick(index)}
                key={index}
                name={item.name}
                path={item.path}
                children={item.children}
              />
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet context={{
            allUsers,
            allQuizzes,
        }} />
      </Box>
    </Box>
  );
}
