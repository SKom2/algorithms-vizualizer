import {useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/services/redux/typeHooks.ts";
import {tick} from "@/services/redux/slices/algorithms/algorithms.slice.ts";

const useTimer = () => {
    const dispatch = useAppDispatch();

    const isSorting = useAppSelector(state => state.algorithmsReducer.sorting);
    const isPaused = useAppSelector(state => state.algorithmsReducer.paused);
    const timerRef = useRef<any>(null);

    useEffect(() => {
        if (isSorting && !isPaused) {
            timerRef.current = setInterval(() => {
                dispatch(tick())
            }, 10)
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };

    }, [isSorting, isPaused, dispatch]);
};

export default useTimer;