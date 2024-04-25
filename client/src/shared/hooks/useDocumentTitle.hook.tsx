import { useEffect, useState } from "react";

export function useDocumentTitle (title: string) {
    const [currentTitle, setTitle] = useState<string>("");

    useEffect(() => {
        document.title = title;
    }, [title]);

    return { currentTitle, setTitle };
}