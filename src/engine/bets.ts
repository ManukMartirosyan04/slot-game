import { LINE_COUNT } from './paylines';

/** Total bet shown in the HUD. Every value divides evenly by LINE_COUNT. */
export const TOTAL_BET_LADDER = [10, 20, 50, 100, 200] as const;

export type TotalBet = (typeof TOTAL_BET_LADDER)[number];

export const STARTING_BALANCE = 1000;

export const MINIMUM_TOTAL_BET = TOTAL_BET_LADDER[0];

export const BETTING = {
  lineCount: LINE_COUNT,
  ladder: TOTAL_BET_LADDER,
  startingBalance: STARTING_BALANCE,
  minimumTotalBet: MINIMUM_TOTAL_BET,
} as const;
