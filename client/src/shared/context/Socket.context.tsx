import { createContext } from "react";
import { Socket, io } from "socket.io-client";
import { URLS } from "../../configs/Links";

interface SocketContextProviderProps {
    children: React.ReactNode;
}

export const SocketContext = createContext<Socket | null>(null);

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
    const socket = io(URLS.API_URL, {
        autoConnect: false,
        withCredentials: true,
    })

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}