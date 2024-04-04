import { Box, Typography } from "@mui/material";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";

export default function EndSection() {

    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        my: 10,
    }

    const titleStyles = {
        fontWeight: 600,
        fontSize: { xs: '2.2rem', sm: '3rem', md: '5rem', lg: '6rem'},
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