import { BARS_LENGTH, States } from '@/services/redux/slices/algorithms/algorithms.constants';
import { awaitTimeout, getRandomNumber, swap } from '@/services/redux/slices/algorithms/algorithms.helpers';
import { IBar } from '@/services/redux/slices/algorithms/algorithms.types';
import { changeBar } from '@/services/redux/slices/algorithms/algorithms.slice';

export const algorithmsService = {
  generateArray: () => {
    return Array.from({ length: BARS_LENGTH }, () => {
      return {
        value: getRandomNumber(1, 70),
        state: States.IDLE,
      };
    })
  },

  shuffleArray: (array: IBar[]) => {
    const randomArr = [...array]
    for (let i = randomArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomArr[i], randomArr[j]] = [randomArr[j], randomArr[i]];
    }

    return randomArr;
  },

  bubbleSort: async (bars: IBar[], delay: number, dispatch: any) => {
    let sortedBars = [...bars]

    for (let i = 0; i < sortedBars.length; i++) {
      for (let j = 0; j < sortedBars.length - i - 1; j++) {

        dispatch(changeBar({ index: j, payload: { state: States.SELECTED } }))
        dispatch(changeBar({ index: j + 1, payload: { state: States.SELECTED } }))

        await awaitTimeout(delay)

        if (sortedBars[j].value > sortedBars[j + 1].value) {
          sortedBars = swap(sortedBars, j, j + 1)

          dispatch(changeBar({ index: j, payload: { value: sortedBars[j].value, state: States.CHANGED } }));
          dispatch(changeBar({ index: j + 1, payload: { value: sortedBars[j + 1].value, state: States.CHANGED } }));

          await awaitTimeout(delay)
        }

        dispatch(changeBar({ index: j, payload: { state: States.IDLE } }))
        dispatch(changeBar({ index: j + 1, payload: { state: States.IDLE } }))
      }
    }

    return sortedBars
  }
}