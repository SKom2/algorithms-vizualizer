import { BARS_LENGTH, States } from '@/services/redux/slices/algorithms/algorithms.constants';
import { awaitTimeout, getRandomNumber, swap } from '@/services/redux/slices/algorithms/algorithms.helpers';
import { IBar } from '@/services/redux/slices/algorithms/algorithms.types';
import {changeBar, setCurrentPosition} from '@/services/redux/slices/algorithms/algorithms.slice';

export const algorithmsService = {
  generateArray: () => {
    return Array.from({ length: BARS_LENGTH }, () => {
      return {
        value: getRandomNumber(1, 70),
        state: States.IDLE,
      };
    })
  },

  bubbleSort: async (bars: IBar[], delay: number, dispatch: any, getState: any) => {
    let sortedBars = [...bars]

    for (let i = getState().algorithmsReducer.currentI; i < sortedBars.length; i++) {
      for (let j = getState().algorithmsReducer.currentJ; j < sortedBars.length - i - 1; j++) {

        if (!getState().algorithmsReducer.paused && !getState().algorithmsReducer.sorting) {

          dispatch(changeBar({ index: j, payload: { state: States.IDLE } }));
          dispatch(changeBar({ index: j + 1, payload: { state: States.IDLE } }));

          return;
        }

        if (getState().algorithmsReducer.paused) {
          dispatch(setCurrentPosition({ i, j }));

          dispatch(changeBar({ index: j, payload: { state: States.PAUSED } }));
          dispatch(changeBar({ index: j + 1, payload: { state: States.PAUSED } }));

          return;
        }

        dispatch(changeBar({ index: j, payload: { state: States.SELECTED } }));
        dispatch(changeBar({ index: j + 1, payload: { state: States.SELECTED } }));

        await awaitTimeout(delay);

        if (sortedBars[j].value > sortedBars[j + 1].value) {
          sortedBars = swap(sortedBars, j, j + 1);

          dispatch(changeBar({ index: j, payload: { value: sortedBars[j].value, state: States.CHANGED } }));
          dispatch(changeBar({ index: j + 1, payload: { value: sortedBars[j + 1].value, state: States.CHANGED } }));

          await awaitTimeout(delay);
        }

        dispatch(changeBar({ index: j, payload: { state: States.IDLE } }));
        dispatch(changeBar({ index: j + 1, payload: { state: States.IDLE } }));
      }

      dispatch(setCurrentPosition({ i: i + 1, j: 0 }));
    }

    dispatch(setCurrentPosition({ i: 0, j: 0 }));

    return sortedBars
  }
}