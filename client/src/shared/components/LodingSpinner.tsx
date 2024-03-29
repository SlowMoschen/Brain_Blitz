import { ClipLoader } from "react-spinners";

interface LoadingSpinnerProps {
    className?: string;
    color: string;
    size: number;
}

export default function LoadingSpinner({className, color, size}:LoadingSpinnerProps): JSX.Element {
    return (
        <ClipLoader className={className} color={color} size={size} speedMultiplier={.8}  />
    );
}