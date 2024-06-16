import { BARS_LENGTH, States } from '@/services/redux/slices/algorithms/algorithms.constants';
import { awaitTimeout, getRandomNumber, swap } from '@/services/redux/slices/algorithms/algorithms.helpers';
import { IBar } from '@/services/redux/slices/algorithms/algorithms.types';
import {
  changeBar,
  countIterations,
  setCurrentPosition, setMinimumIndex,
  setProcessing
} from '@/services/redux/slices/algorithms/algorithms.slice';

export const algorithmsService = {
  generateArray: () => {
    return Array.from({ length: BARS_LENGTH }, () => {
      return {
        value: getRandomNumber(1, 70),
        state: States.IDLE,
      };
    })
  },

  bubbleSort: async (bars: IBar[], dispatch: any, getState: any) => {
    let sortedBars = [...bars]

    for (let i = getState().algorithmsReducer.currentI; i < sortedBars.length; i++) {
      dispatch(setCurrentPosition({ i: i, j: 0 }));

      for (let j = getState().algorithmsReducer.currentJ; j < sortedBars.length - i - 1; j++) {
        dispatch(setCurrentPosition({ i, j }));

        if (getState().algorithmsReducer.paused) {
          dispatch(changeBar({ index: j, payload: { state: States.PAUSED } }));
          dispatch(changeBar({ index: j + 1, payload: { state: States.PAUSED } }));

          return;
        }

        dispatch(setProcessing(true));

        dispatch(changeBar({ index: j, payload: { state: States.SELECTED } }));
        dispatch(changeBar({ index: j + 1, payload: { state: States.SELECTED } }));

        await awaitTimeout(getState().algorithmsReducer.delay);

        if (sortedBars[j].value > sortedBars[j + 1].value) {
          sortedBars = swap(sortedBars, j, j + 1);

          dispatch(changeBar({ index: j, payload: { value: sortedBars[j].value, state: States.CHANGING } }));
          dispatch(changeBar({ index: j + 1, payload: { value: sortedBars[j + 1].value, state: States.CHANGING } }));
          dispatch(countIterations())

          await awaitTimeout(getState().algorithmsReducer.delay);
        }

        if (i === sortedBars.length - 2) {
          dispatch(changeBar({index: j, payload: {state: States.CHANGED}}));
        } else {
          dispatch(changeBar({index: j, payload: {state: States.IDLE}}));
        }
        dispatch(changeBar({ index: j + 1, payload: { state: States.CHANGED } }));
        dispatch(setProcessing(false));
      }
    }

    dispatch(setCurrentPosition({ i: 0, j: 0 }));
    dispatch(setProcessing(false));

    return sortedBars
  },

  selectionSort: async (bars: IBar[], dispatch: any, getState: any) => {
    let sortedBars = [...bars];
    const { currentI, delay } = getState().algorithmsReducer;

    for (let i = currentI; i < sortedBars.length - 1; i++) {
      dispatch(setCurrentPosition({ i, j: i + 1 }));
      const { currentJ, minimumIndex: minimumIndexAtStart  } = getState().algorithmsReducer;
      const startPoint = minimumIndexAtStart === i ? currentJ : minimumIndexAtStart + 1;

      for (let j = startPoint; j < sortedBars.length; j++) {
        dispatch(setCurrentPosition({ i, j }));

        const { paused, minimumIndex } = getState().algorithmsReducer;

        if (paused) {
          dispatch(setProcessing(false));
          dispatch(changeBar({ index: minimumIndex === i ? i : minimumIndex, payload: { state: States.PAUSED } }));
          dispatch(changeBar({ index: i, payload: { state: States.PAUSED } }));

          return;
        }

        dispatch(setProcessing(true));
        dispatch(changeBar({ index: i, payload: { state: States.CHANGING } }));
        dispatch(changeBar({ index: minimumIndex, payload: { state: States.CHANGING } }));
        dispatch(changeBar({ index: j, payload: { state: States.SELECTED } }));

        await awaitTimeout(delay);

        if (sortedBars[j].value < sortedBars[minimumIndex].value) {
          dispatch(changeBar({ index: minimumIndex, payload: { state: States.IDLE } }));
          dispatch(setMinimumIndex(j))
        }

        dispatch(changeBar({ index: j, payload: { state: States.IDLE } }));
      }

      const { minimumIndex } = getState().algorithmsReducer;

      if (minimumIndex !== i) {

        sortedBars = swap(sortedBars, minimumIndex, i);

        dispatch(changeBar({ index: minimumIndex, payload: { value: sortedBars[minimumIndex].value, state: minimumIndex === sortedBars.length - 1 ? States.CHANGED : States.IDLE } }));
        dispatch(changeBar({ index: i, payload: { value: sortedBars[i].value, state: States.CHANGED } }));
      } else {
        dispatch(changeBar({ index: i, payload: { state: States.CHANGED } }));
        dispatch(changeBar({ index: i + 1, payload: { state: States.CHANGED } }));
      }


      dispatch(setMinimumIndex(i + 1))
      dispatch(countIterations());
      await awaitTimeout(delay);
    }

    dispatch(setCurrentPosition({ i: 0, j: 0 }));
    dispatch(setMinimumIndex(0))
    dispatch(setProcessing(false));

    return sortedBars;
  }
}