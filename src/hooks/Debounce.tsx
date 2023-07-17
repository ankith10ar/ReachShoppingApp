import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay?: number) {

    const [debouncedVal, setdebouncedVal] = useState<T>(value);

    useEffect( () => {
        const timer = setTimeout( () => {
            setdebouncedVal(value);
        }, delay || 500);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);
    
    return debouncedVal;

}