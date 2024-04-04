import { createContext, useEffect, useState } from "react";

export interface WindowContextProps {
    width: number;
    height: number;
}

interface WindowContextProviderProps {
    children: React.ReactNode;
}

export const WindowContext = createContext<WindowContextProps>({ width: 0, height: 0 });

export const WindowContextProvider = ({ children }: WindowContextProviderProps) => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <WindowContext.Provider value={{ width, height }}>
            {children}
        </WindowContext.Provider>
    );
}