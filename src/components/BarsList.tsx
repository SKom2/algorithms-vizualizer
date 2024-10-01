import Bar from "@/components/Bar.tsx";
import {useAppDispatch, useAppSelector} from "@/services/redux/typeHooks.ts";
import {useEffect} from "react";
import {generateArrayAction} from "@/services/redux/slices/algorithms/algorithms.slice.ts";


const BarsList = () => {
    const dispatch = useAppDispatch();
    const bars = useAppSelector(state => state.algorithmsReducer.bars);
    const barsLength = useAppSelector(state => state.algorithmsReducer.barsLength);

    useEffect(() => {
        dispatch(generateArrayAction());
    }, [barsLength, dispatch])

    return (
        <div className="h-[560px] flex items-end bg-secondaryScreenColor mt-4 rounded-3xl">
            <div className="h-[80%] list-none grid items-end w-[95%] mx-auto gap-1" style={{gridTemplateColumns: `repeat(${barsLength}, 1fr)`}}>
                {
                    bars.map((bar, index) =>
                        <Bar key={index} bar={bar} />
                    )
                }
            </div>
        </div>
    );
};

export default BarsList;