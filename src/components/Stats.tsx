import colors from "@/data/colors.ts";
import {formatTime} from "@/services/redux/slices/timer/timer.helpers.ts";
import {useAppSelector} from "@/services/redux/typeHooks.ts";

const Stats = () => {
    const time = useAppSelector(state => state.timerReducer.time);
    const iterations = useAppSelector(state => state.algorithmsReducer.iterations);

    return (
        <div className="text-xl flex flex-col items-center mt-3 gap-1" style={{color: colors.pauseButtonColor}}>
            <div>
                Time: <span>{formatTime(time)}</span>
            </div>
            <div>
                Iterations: <span>{iterations}</span>
            </div>
        </div>
    );
};

export default Stats;