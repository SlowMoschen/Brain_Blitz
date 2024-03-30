import { createContext } from "react";

interface IAuthContext {
    user: any;
    setUser: (user: any) => void;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => {},
});