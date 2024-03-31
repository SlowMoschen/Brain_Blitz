import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";

interface DashboardErrorProps {
    error: Error;
}

interface ContainerProps {
    title: string;
    message: string;
}

export default function DashboardError({ error }: DashboardErrorProps) {
    const redirect = useNavigate();
    
    const container = ({ title, message }: ContainerProps) => {

        const redirectTo = title === "Zugriff verweigert" ? "/auth/login" : "/";

        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <h1 className="text-3xl font-bold text-center">{title}</h1>
                <p className="text-center">{message}</p>
                <Button onClick={() => redirect(redirectTo)} className="primary w-full my-5">
                    {
                        title === "Zugriff verweigert" ? "Zum Login" : "Zurück zur Startseite"
                    }
                </Button>
            </div>
        );
    }

    switch (error.message) {
        case "Forbidden":
            console.log("Forbidden");
            return container({ title: "Zugriff verweigert", message: "Sie haben keine Berechtigung, diese Seite zu sehen."});
        case "Network Error":
            console.log("Network Error");
            return container({ title: "Netzwerkfehler", message: "Bitte versuchen Sie es später erneut."});
        case "Failed to fetch":
            console.log("Failed to fetch");
            return container({ title: "Da ist etwas schiefgelaufen", message: "Bitte versuchen Sie es später erneut."});
        default:
            console.error(error);
    }
}