import {useEffect, useRef, useState} from "react";

const useAnimatedNumber = (value: number, duration: number) => {
    const [animatedValue, setAnimatedValue] = useState(value);
    const ref = useRef<any>(null);

    useEffect(() => {
        let start: number | null = null;
        const initialValue = ref.current || value;
        ref.current = value;

        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const current = initialValue + (value - initialValue) * progress;
            setAnimatedValue(current);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [value, duration]);

    return animatedValue;
};

export default useAnimatedNumber;