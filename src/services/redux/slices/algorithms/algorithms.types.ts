export interface BarsInitialState {
  bars: IBar[],
  barsLength: number;
  algorithm: string;
  delay: number;
  barAnimationTime: number;
  iterations: number;
  sorting: boolean;
  processing: boolean;
  paused: boolean;
  sorted: boolean;
  currentI: number;
  currentJ: number;
}

export interface IBar {
  value: number;
  state: string;
}

export interface ChangeBarPayload {
  index: number;
  payload:  {
    value?: number;
    state?: string;
  };
}