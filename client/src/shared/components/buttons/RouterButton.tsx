import { Button, ButtonProps } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface RouterButtonProps extends ButtonProps {
    to: string;
    text: string;
    color: "primary" | "secondary" | "text";
}

export default function RouterButton({ to, text, color, ...rest }: RouterButtonProps) {

    return (
        <Button component={RouterLink} to={to} variant="text" color={color} {...rest}>
            {text}
        </Button>
    )
}