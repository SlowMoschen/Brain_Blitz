import { Button, ButtonProps } from "@mui/material";

interface CallToActionProps extends ButtonProps {
    text: string;
}

export default function CallToAction({ text, ...rest }: CallToActionProps) {
    return (
        <Button variant="contained" color="primary" {...rest}>
            {text}
        </Button>
    )
}