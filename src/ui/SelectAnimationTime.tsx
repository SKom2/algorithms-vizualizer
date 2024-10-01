import { Delays } from "@/services/redux/slices/algorithms/algorithms.constants.ts";
import { useAppDispatch, useAppSelector } from "@/services/redux/typeHooks.ts";
import { changeAnimationTime } from "@/services/redux/slices/algorithms/algorithms.slice.ts";
import { ChangeEvent } from "react";

const selectOptions = [
    {
        label: "SLOW",
        value: Delays.SLOW,
    },
    {
        label: "MEDIUM",
        value: Delays.MEDIUM,
    },
    {
        label: "FAST",
        value: Delays.FAST,
    }
]

const SelectAnimationTime = () => {
    const dispatch = useAppDispatch();
    const selected = useAppSelector(state => state.algorithmsReducer.delay);
    const isProcessing = useAppSelector(state => state.algorithmsReducer.processing);

    const handleTimeChanger = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeAnimationTime(e.target.value));
    };

    const options = selectOptions.map(option => {
        return (
            <option
                key={option.value}
                value={option.value}
                className="bg-bgColor hover:bg-pauseButtonColor hover:text-textColor"
            >
                {option.label}
            </option>
        )
    })

    return (
        <div className="w-1/2">
            <label htmlFor="time" className="sm-text text-secondaryTextColor">Animation speed</label>
            <div className="flex justify-between items-center mt-2 rounded bg-secondaryPurple px-2 cursor-pointer">
                <select
                    name="animation time"
                    id="time"
                    value={selected}
                    onChange={handleTimeChanger}
                    className="w-full rounded h-10 focus:outline-none bg-transparent"
                    disabled={isProcessing}
                >
                    {options}
                </select>
            </div>
        </div>
    );
};

export default SelectAnimationTime;
