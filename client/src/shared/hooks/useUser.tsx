import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { HttpService } from "../services/httpService";

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const httpService = new HttpService();

    const addUser = async () => {
        try {
            const response = await httpService.get("/auth/user");
            if (response.data) {
                setUser(response.data);
                return;
            }

            throw new Error(response.message);
        } catch (error) {
            console.error(error);
        }
    }

    const removeUser = () => {
        setUser(null);
    }

    return { user, addUser, removeUser, setUser };
}