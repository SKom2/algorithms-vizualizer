import Bar from "@/components/Bar.tsx";
import {useAppSelector} from "@/services/redux/typeHooks.ts";


const BarsList = () => {
    const bars = useAppSelector(state => state.algorithmsReducer.bars);
    const barsLength = useAppSelector(state => state.algorithmsReducer.barsLength);


    return (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 list-none grid items-end w-[70%] h-4/5 mx-auto gap-1" style={{gridTemplateColumns: `repeat(${barsLength}, 1fr)`}}>
            {
                bars.map((bar, index) =>
                    <Bar key={index} bar={bar} />
                )
            }
        </div>
    );
};

export default BarsList;