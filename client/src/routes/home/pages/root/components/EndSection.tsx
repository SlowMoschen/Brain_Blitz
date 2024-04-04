import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { BREAKPOINTS } from "../../../../../configs/Breakpoints";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import { WindowContext } from "../../../../../shared/context/ScreenSize.context";

export default function EndSection() {
    const { width } = useContext(WindowContext);

    const isMobile = width < BREAKPOINTS.md;

    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        my: 10,
    }

    const titleStyles = {
        fontWeight: 600,
        fontSize: isMobile ? '2.2rem' : '6rem',
    }
    return (
        <Box sx={{ ...containerStyles }}>
            <Typography variant="h1" className='animated-bg' sx={{ ...titleStyles }}>
                Wissenshungrig?
            </Typography>
            <Typography textAlign={'center'}>
                Entdecke mehr auf unseren Social-Media-Seiten!
            </Typography>
            <CallToAction text="Trette der Community bei" sx={{ my: 2 }} href="https://linktr.ee/BrainBlitz" size="large"/>
        </Box>
    )
}