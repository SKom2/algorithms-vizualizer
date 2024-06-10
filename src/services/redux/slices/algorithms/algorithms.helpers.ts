import { IBar } from '@/services/redux/slices/algorithms/algorithms.types';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
}

export const swap = (arr: IBar[], firstIndex: number, lastIndex: number) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[lastIndex];
  arr[lastIndex] = temp;

  return arr;
}

export const awaitTimeout = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, ms);
  })
}