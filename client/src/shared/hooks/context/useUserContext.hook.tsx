import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../types/User";

export function useUserContext() {
    const { user } = useOutletContext<UserContext>();

    return user;
}