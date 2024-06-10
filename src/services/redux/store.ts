import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {algorithmsReducer} from "./slices/algorithms/algorithms.slice.ts";

const rootReducer = combineReducers({
  algorithmsReducer,
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