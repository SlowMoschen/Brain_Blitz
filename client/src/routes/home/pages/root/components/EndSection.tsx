import { Box, Typography } from "@mui/material";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import useScreenSize from "../../../../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../../../../configs/Breakpoints";

export default function EndSection() {
    const { width } = useScreenSize();

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