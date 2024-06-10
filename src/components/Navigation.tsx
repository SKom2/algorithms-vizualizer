import Button from "@/ui/Button.tsx";
import colors from "@/data/colors.ts";
import {useAppDispatch, useAppSelector} from "@/services/redux/typeHooks.ts";
import {
    bubbleSortAsync,
    generateArrayAction, pauseSortingAction, resetAction,
    resumeSortingAction
} from "@/services/redux/slices/algorithms/algorithms.slice.ts";
import {pauseTimer, resetTimer, startTimer} from "@/services/redux/slices/timer/timer.slice.ts";

const Navigation = () => {
    const isSorting = useAppSelector(state => state.algorithmsReducer.sorting);
    const isPaused = useAppSelector(state => state.algorithmsReducer.paused);
    const isSorted = useAppSelector(state => state.algorithmsReducer.sorted);

    const dispatch = useAppDispatch();

    const handleShuffle = () => {
        dispatch(resetTimer());
        dispatch(generateArrayAction());
    };

    const handleBubbleSort = () => {
        dispatch(startTimer());
        dispatch(bubbleSortAsync());
    };

    const handleToggleSorting = () => {
        if (isPaused) {
            dispatch(resumeSortingAction());
            dispatch(startTimer());
            dispatch(bubbleSortAsync());
        } else if (!isPaused) {
            dispatch(pauseTimer());
            dispatch(pauseSortingAction());
        }
    };

    const handleReset = () => {
        dispatch(resetTimer());
        dispatch(resetAction());
    }

    return (
        <nav className="flex gap-2 items-center justify-center">
            <Button disabled={isSorting || isPaused || isSorted} text="Bubble" onClick={handleBubbleSort}/>
            <Button disabled={isSorting || isPaused} text="Random" onClick={handleShuffle}/>
            <Button disabled={!isSorting && !isPaused} text={isPaused ? "Resume" : "Pause"}
                    onClick={handleToggleSorting}
                    color={isPaused ? colors.resumeButtonColor : colors.pauseButtonColor}/>
            <Button disabled={!isPaused} text="Reset" onClick={handleReset} color={colors.resetButtonColor}/>
        </nav>
    );
};

export default Navigation;