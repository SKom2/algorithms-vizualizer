import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {algorithmsReducer} from "./slices/algorithms/algorithms.slice.ts";
import {timerReducer} from "@/services/redux/slices/timer/timer.slice.ts";

const rootReducer = combineReducers({
    algorithmsReducer,
    timerReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;