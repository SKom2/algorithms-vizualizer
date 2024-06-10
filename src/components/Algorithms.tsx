'use client';

import BarsList from "@/components/BarsList.tsx";
import {useAppDispatch} from "@/services/redux/typeHooks.ts";
import {useEffect} from "react";
import {
    generateArrayAction,
} from "@/services/redux/slices/algorithms/algorithms.slice.ts";
import colors from "@/data/colors.ts";
import Navigation from "@/components/Navigation.tsx";
import Stats from "@/components/Stats.tsx";

const Algorithms = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(generateArrayAction())
    }, []);

    return (
        <section className={`relative w-full h-full pt-4`} style={{background: colors.bgColor}}>
            <Navigation />
            <Stats />
            <BarsList/>
        </section>
    )
};

export default Algorithms;