import { Backdrop, CircularProgress } from "@mui/material";

export default function LoadingScreen() {
    return (
        <Backdrop open={true} sx={{ zIndex: '100' }}>
            <CircularProgress color="primary" />
        </Backdrop>
    )
}
