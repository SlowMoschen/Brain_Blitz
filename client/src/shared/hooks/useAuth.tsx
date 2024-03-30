import { HttpService } from "../services/httpService";
import { useUser } from "./useUser";

export const useAuth = () => {
    const { user, addUser, removeUser, setUser } = useUser();
    const httpService = new HttpService();

    const login = async () => {
        try {
            const response = await httpService.get("/auth/login");
            if (response.data) {
                addUser();
                return;
            }

            throw new Error(response.message);
        } catch (error) {
            console.error(error);
        }
    }

    const logout = async () => {
        try {
            const response = await httpService.get("/auth/logout");
            if (response.data) {
                removeUser();
                return;
            }

            throw new Error(response.message);
        } catch (error) {
            console.error(error);
        }
    }

    return { user, login, logout, setUser };
}