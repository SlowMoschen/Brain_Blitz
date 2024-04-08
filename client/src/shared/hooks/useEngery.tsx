import { useEffect, useState } from "react";
import { ENERGY_CONSUPMTION } from "../../configs/Application";

export function useEnergy(energy: number) {
    const [currentEnergy, setCurrentEnergy] = useState(energy);
    const hasEnoughEnergy = currentEnergy >= ENERGY_CONSUPMTION;
    const setEnergy = (newEnergy: number) => setCurrentEnergy(newEnergy);
    const reduceEnergy = () => { 
        setCurrentEnergy((prev) => prev - ENERGY_CONSUPMTION);
        console.log("Energy reduced by 15", currentEnergy);
    }

    useEffect(() => {
        setCurrentEnergy(energy);
    }, [energy]);

    return { hasEnoughEnergy, setEnergy, reduceEnergy};
}