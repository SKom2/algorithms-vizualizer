'use client';

import BarsList from "@/components/BarsList.tsx";
import Button from "@/ui/Button.tsx";
import {useAppDispatch, useAppSelector} from "@/services/redux/typeHooks.ts";
import {useEffect} from "react";
import {bubbleSortAsync, generateArrayAction} from "@/services/redux/slices/algorithms/algorithms.slice.ts";

const Algorithms = () => {
    const bars = useAppSelector(state => state.algorithmsReducer.bars);
    const delay = useAppSelector(state => state.algorithmsReducer.delay);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(generateArrayAction())
    }, []);

    const handleShuffle = () => {
        dispatch(generateArrayAction());
    };

    const handleBubbleSort = () => {
        dispatch(bubbleSortAsync({ bars, delay, dispatch }));
    }
  return (
      <section className="relative bg-[#21243D] w-full h-full pt-4">
          <div className="flex gap-2 items-center justify-center">
              <Button text="Bubble" onClick={handleBubbleSort}/>
              <Button text="Random" onClick={handleShuffle} />
          </div>
          <BarsList />
      </section>
  );
};

export default Algorithms;