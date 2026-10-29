# Game rules

Status: **draft — not approved for payout implementation yet.**

Theme working title: Night Nile (Ancient Egypt). All credits are fictional.

## Grid

- 5 reels
- 3 visible rows
- Left-to-right evaluation on fixed paylines

## Symbols (proposed)

| Id                                 | Role    | Notes                                               |
| ---------------------------------- | ------- | --------------------------------------------------- |
| `A`, `K`, `Q`, `J`                 | Low     | Egyptian-styled ranks                               |
| `scarab`, `ankh`, `eye`, `pharaoh` | High    | Premium picture symbols                             |
| `wild`                             | Wild    | Golden sun disc. Substitutes for all except scatter |
| `scatter`                          | Scatter | Pyramid. Pays anywhere; no free spins in MVP        |

## Betting (proposed)

- Bet levels: `10, 20, 50, 100, 200` credits
- Starting balance: `1000` credits
- Integer credits only
- Invalid bets and negative balances are rejected
- When balance is below the minimum bet, show a refill action that restores the starting balance

## Paylines (proposed)

- 10 fixed paylines
- Only the highest win per payline is paid
- Line wins require adjacent matches from the leftmost reel
- Scatter pays for 3+ anywhere and multiplies total bet

## Fairness

- Outcome generation is independent of animation
- Production RNG uses a defined interface; tests use a seeded RNG
- Reel strips are fixed sequences; RNG chooses stop positions
- Client-side balance persistence is convenience only and is not trustworthy for real accounts

## Open questions before coding payouts

1. Exact paytable multipliers per symbol count
2. Exact 10 payline shapes
3. Wild-on-wild payout behavior
4. Whether scatter can land on all five reels in MVP strip design
