import { Button, ButtonProps } from "@mui/material";

interface SecondaryButtonProps extends ButtonProps {
    text: string;
}

export default function SecondaryButton({ text, ...rest }: SecondaryButtonProps) {
    return (
        <Button variant="contained" color="secondary" {...rest}>
            {text}
        </Button>
    )
}