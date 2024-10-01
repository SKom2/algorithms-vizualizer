import {FC} from "react";
import {IBar} from "@/services/redux/slices/algorithms/algorithms.types.ts";
import {States} from "@/services/redux/slices/algorithms/algorithms.constants.ts";
import colors from "@/data/colors.ts";
import {useAppSelector} from "@/services/redux/typeHooks.ts";
import useAnimatedNumber from "@/hooks/useAnimatedNumber.ts";

const Bar: FC<{ bar: IBar }> = ({ bar }) => {
    const barAnimationTime = useAppSelector(state => state.algorithmsReducer.barAnimationTime);
    const barsAmount = useAppSelector(state => state.algorithmsReducer.barsLength);
    const animatedValue = useAnimatedNumber(bar.value, barAnimationTime);

    let barColor;

    switch (bar.state) {
        case States.SELECTED:
            barColor = colors.primaryPurple;
            break;
        case States.CHANGING:
            barColor = colors.changingBarColor;
            break;
        case States.CHANGED:
            barColor = colors.changedBarColor;
            break;
        case States.PAUSED:
            barColor = colors.pausedBarColor;
            break;
        case States.IDLE:
        default:
            barColor = colors.barInitialColor;
            break;
    }

    return (
        <div className="h-full flex flex-col justify-end">
            {
                barsAmount <= 60 && <span className="text-white self-center text-[10px]">{Math.round(animatedValue)}</span>
            }
            <div className="text-center text-white h-full rounded-t-xl"
                 style={{height: `${bar.value}%`, transition: `height ${barAnimationTime / 1000}s ease`, backgroundColor: barColor}}>
                <div />
            </div>
        </div>
    );
};

export default Bar;