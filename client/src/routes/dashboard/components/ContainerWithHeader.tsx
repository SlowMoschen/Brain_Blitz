import { Box, Typography } from "@mui/material";

interface ContainerWithHeaderProps {
  header: string;
  caption?: string;
  children: React.ReactNode;
  sx?: { [key: string]: string | number };
  center?: boolean;
}

export default function ContainerWithHeader({ header, children, sx, center, caption }: ContainerWithHeaderProps) {
  const mainContainer = {
    bgcolor: "background.secondary",
    borderRadius: ".375rem",
    width: "90%",
    ...sx,
  };

  const headerContainer = {
    borderRadius: ".375rem .375rem 0 0",
    bgcolor: "accent.light",
    p: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <Box sx={mainContainer}>
      <Box sx={headerContainer}>
        <Typography variant="h5" textAlign={center ? 'center' : 'left'}>{header}</Typography>
        <Typography variant="caption" textAlign={center ? 'center' : 'left'}>
          {caption}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}
