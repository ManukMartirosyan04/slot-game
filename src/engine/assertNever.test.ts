import { describe, expect, it } from 'vitest';
import { assertNever } from './assertNever';

describe('assertNever', () => {
  it('throws for an impossible value at runtime', () => {
    expect(() =>
      assertNever('idle' as never, 'Unhandled game phase'),
    ).toThrowError('Unhandled game phase: idle');
  });
});
