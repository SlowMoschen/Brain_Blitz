import { useState } from "react";

const useToggle = (initialValue: boolean = false): [boolean, () => void] => {
    const [isVisible, setValue] = useState<boolean>(initialValue);

    const toggle = () => {
        setValue(!isVisible);
    }

    return [isVisible, toggle];
}

export default useToggle;