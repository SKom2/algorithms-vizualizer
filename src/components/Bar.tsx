import {FC} from "react";
import {IBar} from "@/services/redux/slices/algorithms/algorithms.types.ts";
import {States} from "@/services/redux/slices/algorithms/algorithms.constants.ts";
import colors from "@/data/colors.ts";
import {useAppSelector} from "@/services/redux/typeHooks.ts";

const Bar: FC<{ bar: IBar }> = ({ bar }) => {
    const barAnimationTime = useAppSelector(state => state.algorithmsReducer.barAnimationTime);

    let barColor;

    switch (bar.state) {
        case States.SELECTED:
            barColor = colors.selectedBarColor;
            break;
        case States.CHANGED:
            barColor = colors.changedBarColor;
            break;
        case States.IDLE:
        default:
            barColor = colors.barInitialColor;
            break;
    }

    return (
         <div style={{height: `${bar.value}%`, transition: `height ${barAnimationTime}s ease`}}>
             <div className="h-full rounded-t-xl" style={{ backgroundColor: barColor } } />
         </div>
    );
};

export default Bar;