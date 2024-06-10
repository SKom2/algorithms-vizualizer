'use client';

import BarsList from "@/components/BarsList.tsx";
import Button from "@/ui/Button.tsx";
import {useAppDispatch, useAppSelector} from "@/services/redux/typeHooks.ts";
import {useEffect} from "react";
import {
    bubbleSortAsync,
    generateArrayAction, pauseSortingAction, resetAction, resumeSortingAction,
} from "@/services/redux/slices/algorithms/algorithms.slice.ts";
import colors from "@/data/colors.ts";

const Algorithms = () => {
    const isSorting = useAppSelector(state => state.algorithmsReducer.sorting);
    const isPaused = useAppSelector(state => state.algorithmsReducer.paused);
    const isSorted = useAppSelector(state => state.algorithmsReducer.sorted);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(generateArrayAction())
    }, []);

    const handleShuffle = () => {
        dispatch(generateArrayAction());
    };

    const handleBubbleSort = () => {
        dispatch(bubbleSortAsync());
    };

    const handleToggleSorting = () => {
        if (isPaused) {
            dispatch(resumeSortingAction());
            dispatch(bubbleSortAsync());
        } else if (!isPaused) {
            dispatch(pauseSortingAction());
        }
    };

    const handleReset = () => {
        dispatch(resetAction());
    }

    return (
        <section className={`relative w-full h-full pt-4`} style={{background: colors.bgColor}}>
            <nav className="flex gap-2 items-center justify-center">
                <Button disabled={isSorting || isPaused || isSorted} text="Bubble" onClick={handleBubbleSort}/>
                <Button disabled={isSorting || isPaused} text="Random" onClick={handleShuffle}/>
                <Button disabled={!isSorting && !isPaused} text={isPaused ? "Resume" : "Pause"} onClick={handleToggleSorting} color={isPaused ? colors.resumeButtonColor : colors.pauseButtonColor}/>
                <Button disabled={!isPaused} text="Reset" onClick={handleReset} color={colors.resetButtonColor}/>
            </nav>
            <BarsList/>
        </section>
    )
};

export default Algorithms;