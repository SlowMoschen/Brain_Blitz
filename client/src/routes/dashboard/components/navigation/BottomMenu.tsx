import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";
import { URLS } from "../../../../configs/Links";
import { useNavigate } from "react-router-dom";

type Pages = "home" | "profile" | "rankings";

export default function BottomMenu() {
  const [value, setValue] = useState<Pages>("home");
  const redirect = useNavigate();

  const handleChange = (_e: React.ChangeEvent<object>, newValue: Pages) => {
    setValue(newValue);
    switch (newValue) {
      case "home":
        redirect(URLS.DASHBOARD);
        break;
      case "profile":
        redirect(URLS.PROFILE);
        break;
      case "rankings":
        redirect(URLS.RANKINGS);
        break;
    }
  };

  const paper = {
    position: "fixed",
    bgcolor: "background.secondary",
    bottom: 0,
    left: 0,
    right: 0,
  };

  const styles = {
    bgcolor: "inherit",
  };

  return (
    <Paper sx={paper}>
      <BottomNavigation
        showLabels
        sx={styles}
        onChange={(_e, newValue) => handleChange(_e, newValue)}
        value={value}
      >
        <BottomNavigationAction label="Rankings" value="rankings" icon={<LeaderboardIcon />} />
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Profile" value="profile" icon={<AccountBoxIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
