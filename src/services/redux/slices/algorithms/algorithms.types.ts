export interface BarsInitialState {
  bars: IBar[],
  barsLength: number;
  algorithm: string;
  delay: number;
  barAnimationTime: number;
  sorting: boolean;
  sorted: boolean;
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