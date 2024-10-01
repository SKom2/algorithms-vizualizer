import Button from "@/ui/Button.tsx";
import colors from "@/data/colors.ts";
import {useAppDispatch, useAppSelector} from "@/services/redux/typeHooks.ts";
import {
    bubbleSortAsync,
    generateArrayAction, pauseSortingAction, resetAction,
    selectionSortAsync
} from "@/services/redux/slices/algorithms/algorithms.slice.ts";
import {pauseTimerAction, resetTimer, startTimerAction} from "@/services/redux/slices/timer/timer.slice.ts";
import {Algorithms} from "@/services/redux/slices/algorithms/algorithms.constants.ts";

const ControlButtons = () => {
    const isSorting = useAppSelector(state => state.algorithmsReducer.sorting);
    const isPaused = useAppSelector(state => state.algorithmsReducer.paused);
    const isProcessing = useAppSelector(state => state.algorithmsReducer.processing);
    const chosenAlgorithm = useAppSelector(state => state.algorithmsReducer.algorithm);
    const isSorted = useAppSelector(state => state.algorithmsReducer.sorted);

    const dispatch = useAppDispatch();

    const handleShuffle = () => {
        handleReset()
        dispatch(generateArrayAction());
    };

    let currentAlgorithm;
    switch (chosenAlgorithm) {
        case Algorithms.SELECTION_SORT:
            currentAlgorithm = selectionSortAsync;
            break;
        default:
            currentAlgorithm = bubbleSortAsync;
            break;
    }

    const handleToggleSorting = () => {
        if (!isSorting) {
            dispatch(currentAlgorithm());
            dispatch(startTimerAction());
        } else if (!isPaused) {
            dispatch(pauseSortingAction())
            dispatch(pauseTimerAction());
        } else if (isPaused && !isProcessing) {
            dispatch(startTimerAction());
            dispatch(currentAlgorithm());
        }
    };

    const handleReset = () => {
        dispatch(resetTimer());
        dispatch(resetAction());
    }

    const getButtonText = () => {
        if (!isSorting) {
            return "Start"
        }
        return isProcessing ? "Pause" : "Resume";
    };

    const getButtonColor = () => {
        if (!isSorting) {
            return colors.resumeButtonColor;
        }
        return isPaused ? colors.resumeButtonColor : colors.pauseButtonColor;
    };

    return (
        <div className="flex gap-2 justify-center">
            <Button disabled={isProcessing} text="Random" onClick={handleShuffle}/>
            <Button
                disabled={isProcessing && isPaused || isSorted}
                text={getButtonText()}
                onClick={handleToggleSorting}
                color={getButtonColor()}
            />
            <Button disabled={!isPaused || isProcessing} text="Reset" onClick={handleReset} color={colors.resetButtonColor}/>
        </div>
    );
};

export default ControlButtons;