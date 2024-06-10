import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BarsInitialState, ChangeBarPayload, IBar } from '@/services/redux/slices/algorithms/algorithms.types';
import { algorithmsService } from '@/services/redux/slices/algorithms/algorithms.service';
import {
  AlgorithmsSlice,
  BarAnimationTimes,
  BARS_LENGTH,
  Delays
} from '@/services/redux/slices/algorithms/algorithms.constants';

export const bubbleSortAsync = createAsyncThunk<IBar[], { bars: IBar[], delay: number, dispatch: any }>(
  'algorithms/bubbleSort',
  async ({ bars, delay, dispatch }) => {
    return await algorithmsService.bubbleSort(bars, delay, dispatch);
  }
);

const initialState: BarsInitialState = {
  bars: [],
  barsLength: BARS_LENGTH,
  algorithm: AlgorithmsSlice.BUBBLE_SORT,
  delay: Delays.LONG,
  barAnimationTime: BarAnimationTimes.LONG,
  sorting: false,
  sorted: false,
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
    },

    shuffleArrayAction: (state, action: PayloadAction<IBar[]>) => {
      state.bars = algorithmsService.shuffleArray(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bubbleSortAsync.fulfilled, (state, action) => {
      state.bars = action.payload;
      state.sorted = true;
      state.sorting = false;
    });
    builder.addCase(bubbleSortAsync.pending, (state) => {
      state.sorting = true;
    });
    builder.addCase(bubbleSortAsync.rejected, (state) => {
      state.sorting = false;
    });
  }
})

export const {
  shuffleArrayAction,
  generateArrayAction,
  changeBar
} = algorithmsSlice.actions;
export const algorithmsReducer = algorithmsSlice.reducer;