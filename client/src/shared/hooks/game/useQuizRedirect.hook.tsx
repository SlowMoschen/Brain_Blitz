import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/useUserContext.hook";
import { GAME } from "../../../configs/Application";
import { URLS } from "../../../configs/Links";

export function useQuizRedirect() {
    const redirect = useNavigate();
    const user = useUserContext();

    const hasEnoughEnergy = user.energy >= GAME.ENERGY_CONSUPMTION;

    const handleQuizRedirect = (id: string) => {
        const isProduction = import.meta.env.PROD;
        if (!hasEnoughEnergy && isProduction) return 
        redirect(URLS.QUIZ + `/${id}`);
    };

    return handleQuizRedirect;
}