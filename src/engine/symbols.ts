export const REEL_COUNT = 5;
export const VISIBLE_ROWS = 3;

export const SYMBOL_IDS = [
  'J',
  'Q',
  'K',
  'A',
  'scarab',
  'ankh',
  'eye',
  'pharaoh',
  'wild',
  'scatter',
] as const;

export type SymbolId = (typeof SYMBOL_IDS)[number];

export type SymbolKind = 'low' | 'high' | 'wild' | 'scatter';

export const SYMBOL_KIND: Record<SymbolId, SymbolKind> = {
  J: 'low',
  Q: 'low',
  K: 'low',
  A: 'low',
  scarab: 'high',
  ankh: 'high',
  eye: 'high',
  pharaoh: 'high',
  wild: 'wild',
  scatter: 'scatter',
};

export const LINE_SYMBOL_IDS = [
  'J',
  'Q',
  'K',
  'A',
  'scarab',
  'ankh',
  'eye',
  'pharaoh',
  'wild',
] as const;

export type LineSymbolId = (typeof LINE_SYMBOL_IDS)[number];
