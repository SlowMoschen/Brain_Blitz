import { Box, Typography } from "@mui/material";

interface ContainerWithHeaderProps {
    header: string;
    children: React.ReactNode;
    sx?: { [key: string]: string | number };
}

export default function ContainerWithHeader({ header, children, sx }: ContainerWithHeaderProps) {

    const mainContainer = {
        bgcolor: "background.secondary",
        borderRadius: '.375rem',
        width: '90%',
        ...sx,
    }
    
    const headerContainer = {
        borderRadius: '.375rem .375rem 0 0',
        bgcolor: 'accent.light',
        p: 2,
    }

    return (
        <Box sx={mainContainer}>
            <Box sx={headerContainer}>
                <Typography variant="h5">{header}</Typography>
            </Box>
            {children}
        </Box>
    );
}