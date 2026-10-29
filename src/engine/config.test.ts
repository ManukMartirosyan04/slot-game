import { describe, expect, it } from 'vitest';
import { BETTING, TOTAL_BET_LADDER } from './bets';
import { LINE_COUNT, PAYLINES } from './paylines';
import { LINE_PAYTABLE, SCATTER_PAYTABLE } from './paytable';
import { LINE_SYMBOL_IDS, SYMBOL_IDS, SYMBOL_KIND } from './symbols';

describe('engine config', () => {
  it('defines 5 reels, 3 rows, and 10 fixed paylines', () => {
    expect(PAYLINES).toHaveLength(LINE_COUNT);
    for (const line of PAYLINES) {
      expect(line).toHaveLength(5);
      for (const row of line) {
        expect(row).toBeGreaterThanOrEqual(0);
        expect(row).toBeLessThan(3);
      }
    }
  });

  it('keeps every total bet divisible by the line count', () => {
    for (const totalBet of TOTAL_BET_LADDER) {
      expect(totalBet % BETTING.lineCount).toBe(0);
    }
    expect(BETTING.startingBalance).toBe(1000);
    expect(BETTING.minimumTotalBet).toBe(10);
  });

  it('treats grouped symbols as separate ids with shared multipliers', () => {
    expect(new Set(SYMBOL_IDS).size).toBe(SYMBOL_IDS.length);
    expect(LINE_PAYTABLE.J).toEqual(LINE_PAYTABLE.Q);
    expect(LINE_PAYTABLE.J).not.toBe(LINE_PAYTABLE.Q);
    expect(SYMBOL_KIND.J).toBe('low');
    expect(SYMBOL_KIND.scatter).toBe('scatter');
    expect(LINE_SYMBOL_IDS).not.toContain('scatter');
  });

  it('quotes line and scatter multipliers on different bases', () => {
    expect(LINE_PAYTABLE.wild).toEqual({ 3: 15, 4: 50, 5: 150 });
    expect(SCATTER_PAYTABLE).toEqual({ 3: 2, 4: 10, 5: 50 });
    expect(LINE_PAYTABLE.pharaoh[5]).toBe(100);
  });
});
