import { Button, ButtonProps } from "@mui/material";

interface SecondaryButtonProps extends ButtonProps {
    text?: string;
}

export default function SecondaryButton({ text, children, ...rest }: SecondaryButtonProps) {
    return (
        <Button variant="contained" color="secondary" {...rest}>
            {text}
            {children}
        </Button>
    )
}