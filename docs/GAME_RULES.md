# Game rules

Status: **approved for engine implementation**

Theme: Night Nile (Ancient Egypt — dark gold + turquoise).  
All credits are fictional. No real-money gambling.

## Feature scope

| Feature | MVP |
| --- | --- |
| 5×3 reels | Yes |
| 10 fixed paylines | Yes |
| Wild | Yes |
| Scatter credit pays | Yes |
| Free Spins | No (phase 2) |
| Win multipliers feature | No (phase 2) |
| Bonus / money symbols / jackpot | No |

## Grid and paylines

- 5 reels, 3 visible rows
- 10 fixed paylines; players cannot change line count
- Line wins evaluate left to right on adjacent positions
- Row index `0` = top, `1` = middle, `2` = bottom

Payline shapes (row index per reel 1→5):

1. `1-1-1-1-1`
2. `0-0-0-0-0`
3. `2-2-2-2-2`
4. `0-1-2-1-0`
5. `2-1-0-1-2`
6. `0-0-1-0-0`
7. `2-2-1-2-2`
8. `1-0-0-0-1`
9. `1-2-2-2-1`
10. `0-1-1-1-0`

## Symbols

Symbols are distinct ids. Grouped rows below share payout numbers only; they do **not** match each other.

| Id | Kind | Notes |
| --- | --- | --- |
| `J` | low | does not match `Q` |
| `Q` | low | does not match `J` |
| `K` | low | does not match `A` |
| `A` | low | does not match `K` |
| `scarab` | high | does not match `ankh` |
| `ankh` | high | does not match `scarab` |
| `eye` | high | Eye of Horus |
| `pharaoh` | high | premium |
| `wild` | wild | golden sun; substitutes for all except `scatter` |
| `scatter` | scatter | pyramid; not a line symbol |

## Betting

- Total bet ladder: `10, 20, 50, 100, 200`
- `LINE_COUNT = 10`
- `betPerLine = totalBet / LINE_COUNT` (exact integer for every ladder value)
- Starting balance: `1000`
- Integer credits only
- Reject invalid bets and spins that would make balance negative
- When balance `<` minimum total bet, offer refill to `1000`

### Payout bases

- **Line wins** pay `multiplier × betPerLine`
- **Scatter wins** pay `multiplier × totalBet`
- UI shows total bet only; bet-per-line is an engine detail

## Paytable (draft numbers; calibrate with strips)

Multipliers for line symbols are quoted against **bet per line**.  
Scatter multipliers are quoted against **total bet**.

| Symbol | 3× | 4× | 5× | Base |
| --- | --- | --- | --- | --- |
| `J`, `Q` | 2 | 5 | 15 | betPerLine |
| `K`, `A` | 3 | 8 | 25 | betPerLine |
| `scarab`, `ankh` | 5 | 15 | 50 | betPerLine |
| `eye` | 8 | 25 | 80 | betPerLine |
| `pharaoh` | 10 | 40 | 100 | betPerLine |
| `wild` | 15 | 50 | 150 | betPerLine |
| `scatter` | 2 | 10 | 50 | totalBet |

These numbers are a starting point. Final balance comes from reel-strip calibration, not from assuming RTP in advance.

## Line evaluation

For each payline:

1. Read the 5 symbols left to right.
2. `scatter` never participates in line wins. `wild` never substitutes for `scatter`.
3. Collect every eligible candidate payout:
   - **Wild run:** count leading consecutive `wild` symbols. If length ≥ 3, use wild paytable for that length.
   - **Each ordinary symbol `S`:** count the longest leading run where each cell is `S` or `wild`. Stop at the first other symbol (including `scatter`). If length ≥ 3, use `S` paytable for that length.
4. The line pays only the **highest** candidate.
5. Sum line wins across all 10 paylines.

### Required examples

| Line | Winner |
| --- | --- |
| `A A A K Q` | 3×`A` |
| `W A A K Q` | 3×`A` |
| `W W W J Q` | `max(3×wild, 4×J)` |
| `W W A A A` | 5×`A` (2×wild does not pay) |
| `W W W W W` | 5×`wild` |
| `J J J W W` | 5×`J` |
| `scarab scarab scarab ankh A` | 3×`scarab` (not interchangeable with `ankh`) |

## Scatter evaluation

- Count visible `scatter` instances on the 5×3 grid.
- Pays for 3, 4, or 5 scatters.
- Does not require a payline.
- Does not trigger Free Spins in MVP.
- Added on top of line wins.

### Strip constraint

On every reel strip, no 3 consecutive positions may contain more than one `scatter`.  
Therefore each reel shows at most one scatter in the visible window, and the grid has at most 5 scatters.  
Under this constraint, scatter symbol-count and distinct-reel-count are identical.

## Fairness and outcome model

- Decide the full spin result before animation.
- Each reel has a fixed strip; RNG selects a stop index per reel.
- Production RNG and test RNG share one interface; tests use a seeded generator.
- Client-side balance storage is convenience only and is not authoritative.

## Validation plan

### Exact enumeration

If reel lengths are `L1…L5`, enumerate all `N = L1×L2×L3×L4×L5` stop tuples when computationally feasible (target strip lengths ~20–30 so `N` stays in millions to low tens of millions).

```text
RTP = Σ win(outcome) / (N × totalBet)
hitFrequency = |{outcome | win > 0}| / N
```

Also record win/totalBet percentiles and max win as volatility diagnostics.

### Simulation

Seeded Monte Carlo (1e6–1e7 spins) cross-checks enumeration on the same strips and remains available if strips grow too large for full enumeration.

### Automated tests

Unit-test line evaluation, wild max-of-candidates, scatter counting, multi-line accumulation, bet-per-line splitting, and balance rejection cases with exact credit assertions.

### Calibration loop

1. Freeze these rules.
2. Author strips under the scatter spacing constraint.
3. Enumerate / simulate.
4. Adjust strip weights (preferred) or paytable numbers until internal targets look acceptable.
5. Do not change evaluation rules to “fix” RTP.

Internal calibration targets (not claimed measured results): RTP about 94–97%, hit frequency about 20–35%.
