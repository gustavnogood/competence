import { useState, useEffect, useRef } from "react";

export const useResizeHandler = () => {
    const treeWrapperRef = useRef(null);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleResize = () => {
            if (treeWrapperRef.current) {
                const { clientWidth, clientHeight } = treeWrapperRef.current;
                setTranslate({ x: clientWidth / 2, y: clientHeight / 2 });
            }
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { treeWrapperRef, translate };
}