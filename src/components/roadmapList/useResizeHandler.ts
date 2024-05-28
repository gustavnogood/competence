import { useState, useEffect, useRef } from "react";

export const useResizeHandler = () => {
    const treeWrapperRef = useRef<HTMLDivElement | null>(null);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleResize = () => {
            if (treeWrapperRef.current) {
                const { clientWidth, clientHeight } = treeWrapperRef.current;
                setTranslate({ x: clientWidth / 2, y: clientHeight / 2 });
            }
        };

        const debounceHandleResize = debounce(handleResize, 100);

        window.addEventListener('resize', debounceHandleResize);
        handleResize(); // Initial call to set translate

        return () => {
            window.removeEventListener('resize', debounceHandleResize);
        };
    }, []);

    return { treeWrapperRef, translate };
};

// Utility function to debounce events
function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
