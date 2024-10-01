import { useAppDispatch, useAppSelector } from "@/services/redux/typeHooks.ts";
import { setChosenAlgorithm } from "@/services/redux/slices/algorithms/algorithms.slice.ts";
import { Algorithms } from "@/services/redux/slices/algorithms/algorithms.constants.ts";
import SortButton from "@/ui/SortButton.tsx";

const SortsButtonsContainer = () => {
    const dispatch = useAppDispatch();

    const { sorting: isSorting, sorted: isSorted, algorithm: chosenAlgorithm } = useAppSelector((state) => state.algorithmsReducer);

    const chooseAlgorithm = (algorithm: string) => {
        dispatch(setChosenAlgorithm(algorithm));
    };

    const isButtonDisabled = isSorting || isSorted;

    return (
        <div className="flex max-w-[170px] flex-col gap-2 items-start">
            <span>ALGORITHMS LIST</span>
            <SortButton
                disabled={isButtonDisabled}
                selected={chosenAlgorithm === Algorithms.BUBBLE_SORT}
                text="Bubble"
                onClick={() => chooseAlgorithm(Algorithms.BUBBLE_SORT)}
            />
            <SortButton
                disabled={isButtonDisabled}
                selected={chosenAlgorithm === Algorithms.SELECTION_SORT}
                text="Selection"
                onClick={() => chooseAlgorithm(Algorithms.SELECTION_SORT)}
            />
        </div>
    );
};

export default SortsButtonsContainer;
