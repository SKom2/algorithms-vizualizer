import Slider from "@/ui/Slider.tsx";
import { useAppDispatch, useAppSelector } from "@/services/redux/typeHooks.ts";
import { changeAnimationTime, changeBarsNumber } from "@/services/redux/slices/algorithms/algorithms.slice.ts";
import { Delays } from "@/services/redux/slices/algorithms/algorithms.constants.ts";
import { ChangeEvent } from "react";

const Settings = () => {
    const dispatch = useAppDispatch();
    const barLength = useAppSelector(state => state.algorithmsReducer.barsLength);
    const animationDelay = useAppSelector(state => state.algorithmsReducer.delay);
    const isProcessing = useAppSelector(state => state.algorithmsReducer.processing);

    const handleBarsAmount = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        dispatch(changeBarsNumber(value));
    };

    const handleVisualizationSpeed = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        switch (value) {
            case 1:
                dispatch(changeAnimationTime(Delays.SLOW));
                break;
            case 3:
                dispatch(changeAnimationTime(Delays.FAST));
                break;
            case 2:
            default:
                dispatch(changeAnimationTime(Delays.MEDIUM));
                break;
        }
    };

    const getDisplayedSpeed = () => {
        switch (animationDelay) {
            case Delays.SLOW:
                return "SLOW";
            case Delays.FAST:
                return "FAST";
            case Delays.MEDIUM:
            default:
                return "MEDIUM";
        }
    };

    return (
        <div className="flex justify-between gap-6 mt-3 mb-5 items-center">
            <Slider
                title="Amount of bars"
                min={10}
                max={100}
                step={10}
                value={barLength}
                displayedValue={barLength}
                onChange={handleBarsAmount}
                disabled={isProcessing}
            />
            <Slider
                title="Visualization speed"
                min={1}
                max={3}
                step={1}
                value={animationDelay === Delays.SLOW ? 1 : animationDelay === Delays.FAST ? 3 : 2}
                displayedValue={getDisplayedSpeed()}
                onChange={handleVisualizationSpeed}
                disabled={isProcessing}
            />
        </div>
    );
};

export default Settings;
