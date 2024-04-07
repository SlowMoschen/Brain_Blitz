import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { useState } from "react";

export default function BottomMenu() {
    const [value, setValue] = useState<'home' | 'profile' | 'rankings'>('home');

    return (
        <BottomNavigation
            showLabels
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'background.secondary' }}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            value={value}
        >
            <BottomNavigationAction label="Profile" value="profile" icon={<AccountBoxIcon/>} />
            <BottomNavigationAction label="Home" value="home" icon={<HomeIcon/>} />
            <BottomNavigationAction label="Rankings" value="rankings" icon={<LeaderboardIcon/>} />
        </BottomNavigation>
    );
}