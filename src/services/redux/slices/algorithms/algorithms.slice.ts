import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BarsInitialState, ChangeBarPayload, IBar } from '@/services/redux/slices/algorithms/algorithms.types';
import { algorithmsService } from '@/services/redux/slices/algorithms/algorithms.service';
import {
  Algorithms,
  BarAnimationTimes,
  BARS_LENGTH,
  Delays, States
} from '@/services/redux/slices/algorithms/algorithms.constants';
import {pauseTimer} from "@/services/redux/slices/timer/timer.slice.ts";

export const bubbleSortAsync = createAsyncThunk<IBar[], void, { state: any, dispatch: any }>(
    'algorithms/bubbleSort',
    async (_, { dispatch, getState }) => {
      const bars = getState().algorithmsReducer.bars;
      const sortedBars = await algorithmsService.bubbleSort(bars, dispatch, getState);
      return sortedBars || bars;
    }
);

export const selectionSortAsync = createAsyncThunk<IBar[], void, { state: any, dispatch: any }>(
    'algorithms/bubbleSort',
    async (_, { dispatch, getState }) => {
      const bars = getState().algorithmsReducer.bars;
      const sortedBars = await algorithmsService.selectionSort(bars, dispatch, getState);
      return sortedBars || bars;
    }
);

const initialState: BarsInitialState = {
  bars: [],
  barsLength: BARS_LENGTH,
  algorithm: Algorithms.BUBBLE_SORT,
  delay: Delays.LONG,
  barAnimationTime: BarAnimationTimes.LONG,
  iterations: 0,
  sorting: false,
  processing: false,
  paused: false,
  sorted: false,
  currentI: 0,
  currentJ: 0,
  minimumIndex: 0,
}

const algorithmsSlice = createSlice({
  name: "algorithms",
  initialState: initialState,
  reducers: {
    changeBar: (state, action: PayloadAction<ChangeBarPayload>) => {
      state.bars = state.bars.map((item, i) => {
        return i === action.payload.index ? { ...item, ...action.payload.payload } : item
      })
    },

    generateArrayAction: (state) => {
      state.bars = algorithmsService.generateArray();
      state.sorted = false;
    },

    pauseSortingAction: (state) => {
      state.paused = true;
    },

    setCurrentPosition: (state, action: PayloadAction<{ i: number, j: number }>) => {
      state.currentI = action.payload.i;
      state.currentJ = action.payload.j;
    },

    countIterations: (state) => {
      state.iterations += 1;
    },

    resetAction: (state) => {
      state.bars = state.bars.map((bar) => ({
        ...bar,
        state: States.IDLE
      }));
      state.sorted = false;
      state.paused = false;
      state.sorting = false;
      state.processing = false;
      state.currentI = 0;
      state.currentJ = 0;
      state.iterations = 0;
      state.minimumIndex = 0;
    },

    setMinimumIndex: (state, action: PayloadAction<number>) => {
      state.minimumIndex = action.payload;
    },

    setChosenAlgorithm: (state, action: PayloadAction<string>) => {
      state.algorithm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bubbleSortAsync.fulfilled, (state) => {
      state.processing = false;
      if (!state.paused) {
        state.sorting = false;
        state.sorted = true;
        state.currentI = 0;
        state.currentJ = 0;
        pauseTimer()
      }
    });
    builder.addCase(bubbleSortAsync.pending, (state) => {
      state.processing = true;
      state.sorting = true;
      state.paused = false;
    });
    builder.addCase(bubbleSortAsync.rejected, () => {
      resetAction()
    });
  }
})

export const {
  generateArrayAction,
  changeBar,
  pauseSortingAction,
  setCurrentPosition,
  resetAction,
  countIterations,
  setMinimumIndex,
  setChosenAlgorithm
} = algorithmsSlice.actions;
export const algorithmsReducer = algorithmsSlice.reducer;