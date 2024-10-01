import {formatTime} from "@/services/redux/slices/timer/timer.helpers.ts";
import {useAppSelector} from "@/services/redux/typeHooks.ts";

const Stats = () => {
    const time = useAppSelector(state => state.timerReducer.time);
    const iterations = useAppSelector(state => state.algorithmsReducer.iterations);

    return (
        <div className="sm-text flex flex-col items-center gap-2 select-none">
            <div>
                Iterations: <span>{iterations}</span>
            </div>
            <div>
                Time: <span>{formatTime(time)}</span>
            </div>
        </div>
    );
};

export default Stats;