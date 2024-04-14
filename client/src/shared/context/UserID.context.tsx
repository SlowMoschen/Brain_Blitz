import { createContext, useState } from "react";

interface UserIDContextProps {
    userID: string;
    setUserID: React.Dispatch<React.SetStateAction<string>>;
}

interface UserIDContextProviderProps {
    children: React.ReactNode;
}

export const UserIDContext = createContext<UserIDContextProps>({ userID: "", setUserID: () => {} });

export const UserIDContextProvider = ({ children }: UserIDContextProviderProps) => {
    const [userID, setUserID] = useState<string>("");

    return (
        <UserIDContext.Provider value={{ userID, setUserID }}>
            {children}
        </UserIDContext.Provider>
    );
}