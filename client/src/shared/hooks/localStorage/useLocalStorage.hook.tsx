
export function useLocalStorage() {
    
    const setData = (key: string, value: unknown) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    const getData = (key: string) => {
        return JSON.parse(localStorage.getItem(key) as string);
    }

    const removeData = (key: string) => {
        localStorage.removeItem(key);
    }

    return { setData, getData, removeData };
}