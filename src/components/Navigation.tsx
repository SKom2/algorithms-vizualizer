import Button from "@/ui/Button.tsx";
import colors from "@/data/colors.ts";
import {useAppDispatch, useAppSelector} from "@/services/redux/typeHooks.ts";
import {
    bubbleSortAsync,
    generateArrayAction, pauseSortingAction, resetAction,
    resumeSortingAction, selectionSortAsync
} from "@/services/redux/slices/algorithms/algorithms.slice.ts";
import {pauseTimerAction, resetTimer, startTimerAction} from "@/services/redux/slices/timer/timer.slice.ts";

const Navigation = () => {
    const isSorting = useAppSelector(state => state.algorithmsReducer.sorting);
    const isPaused = useAppSelector(state => state.algorithmsReducer.paused);
    const isSorted = useAppSelector(state => state.algorithmsReducer.sorted);
    const isProcessing = useAppSelector(state => state.algorithmsReducer.processing); // Select processing state

    const dispatch = useAppDispatch();

    const handleShuffle = () => {
        handleReset()
        dispatch(generateArrayAction());
    };

    const handleBubbleSort = () => {
        dispatch(startTimerAction());
        dispatch(bubbleSortAsync());
    };

    const handleSelectionSort = () => {
        dispatch(startTimerAction());
        dispatch(selectionSortAsync());
    };

    const handleToggleSorting = () => {
        if (isPaused && !isProcessing) {
            dispatch(resumeSortingAction());
            dispatch(startTimerAction());
            dispatch(selectionSortAsync());
        } else if (!isPaused) {
            dispatch(pauseSortingAction());
            dispatch(pauseTimerAction());
        }
    };

    const handleReset = () => {
        dispatch(resetTimer());
        dispatch(resetAction());
    }

    return (
        <nav className="flex gap-2 items-center justify-center">
            <Button disabled={isSorting || isPaused || isSorted} text="Bubble" onClick={handleBubbleSort}/>
            <Button disabled={isSorting || isPaused || isSorted} text="Selection" onClick={handleSelectionSort}/>
            <Button disabled={isProcessing} text="Random" onClick={handleShuffle}/>
            <Button disabled={!isSorting && !isPaused || isProcessing && isPaused} text={isPaused ? "Resume" : "Pause"}
                    onClick={handleToggleSorting}
                    color={isPaused ? colors.resumeButtonColor : colors.pauseButtonColor}/>
            <Button disabled={!isPaused || isProcessing} text="Reset" onClick={handleReset} color={colors.resetButtonColor}/>
        </nav>
    );
};

export default Navigation;