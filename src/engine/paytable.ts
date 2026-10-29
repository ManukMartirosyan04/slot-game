import type { LineSymbolId } from './symbols';

export type MatchCount = 3 | 4 | 5;

export type PayoutBase = 'betPerLine' | 'totalBet';

export type Multipliers = Record<MatchCount, number>;

/** Line-symbol multipliers apply to betPerLine, not total bet. */
export const LINE_PAYTABLE: Record<LineSymbolId, Multipliers> = {
  J: { 3: 2, 4: 5, 5: 15 },
  Q: { 3: 2, 4: 5, 5: 15 },
  K: { 3: 3, 4: 8, 5: 25 },
  A: { 3: 3, 4: 8, 5: 25 },
  scarab: { 3: 5, 4: 15, 5: 50 },
  ankh: { 3: 5, 4: 15, 5: 50 },
  eye: { 3: 8, 4: 25, 5: 80 },
  pharaoh: { 3: 10, 4: 40, 5: 100 },
  wild: { 3: 15, 4: 50, 5: 150 },
};

/** Scatter multipliers apply to total bet. */
export const SCATTER_PAYTABLE: Multipliers = {
  3: 2,
  4: 10,
  5: 50,
};

export const PAYOUT_BASE = {
  line: 'betPerLine',
  scatter: 'totalBet',
} as const satisfies Record<'line' | 'scatter', PayoutBase>;
