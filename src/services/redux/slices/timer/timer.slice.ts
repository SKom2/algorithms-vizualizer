import { createSlice } from "@reduxjs/toolkit";
import {AppDispatch} from "@/services/redux/store.ts";

interface TimerState {
    time: number;
}

const initialState: TimerState = {
    time: 0
}


const timerSlice = createSlice({
    name: "timer",
    initialState: initialState,
    reducers: {
        tick: (state) => {
            state.time += 10;
        },
        resetTimer: (state) => {
            state.time = 0;
        }
    }
});

let timerRef: any = null;

export const startTimer = () => (dispatch: AppDispatch) => {
    if (!timerRef) {
        timerRef = setInterval(() => {
            dispatch(tick());
        }, 10);
    }
};

export const pauseTimer = () => () => {
    if (timerRef) {
        clearInterval(timerRef);
        timerRef = null;
    }
};

export const pauseTimerAtTheEndOfSorting = () => {
    if (timerRef) {
        clearInterval(timerRef);
        timerRef = null;
    }
};

export const { tick, resetTimer } = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
