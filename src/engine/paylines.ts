import { REEL_COUNT, VISIBLE_ROWS } from './symbols';

export const LINE_COUNT = 10;

export type RowIndex = 0 | 1 | 2;

export type Payline = readonly [
  RowIndex,
  RowIndex,
  RowIndex,
  RowIndex,
  RowIndex,
];

/** Row index per reel, left to right. 0 = top, 1 = middle, 2 = bottom. */
export const PAYLINES = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
  [0, 0, 1, 0, 0],
  [2, 2, 1, 2, 2],
  [1, 0, 0, 0, 1],
  [1, 2, 2, 2, 1],
  [0, 1, 1, 1, 0],
] as const satisfies readonly Payline[];

export const GRID = {
  reels: REEL_COUNT,
  rows: VISIBLE_ROWS,
  lines: LINE_COUNT,
} as const;
