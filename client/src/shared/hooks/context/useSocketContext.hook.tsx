import { useContext } from "react";
import { SocketContext } from "../../context/Socket.context";

export function useSocketContext() {
    const socket = useContext(SocketContext);
    
    return socket ;
}