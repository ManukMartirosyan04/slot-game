# Agent conventions

Speak with the user in Armenian. Write code, identifiers, comments, and docs in English.

## Architecture boundaries

| Area         | Responsibility                                               | Must not depend on       |
| ------------ | ------------------------------------------------------------ | ------------------------ |
| `src/engine` | Pure game rules, RNG, paylines, payouts, state machine types | React, PixiJS, DOM, GSAP |
| `src/game`   | Orchestration between engine, store, and view                | Pixi internals           |
| `src/render` | Imperative PixiJS `GameView` and animations                  | React components         |
| `src/ui`     | React HUD, menus, settings                                   | PixiJS                   |
| `src/state`  | Zustand domain store                                         | PixiJS animation state   |
| `src/infra`  | Audio, storage, logging                                      | Game rules               |
| `src/app`    | App shell and bootstrap                                      | Business rules           |

Spin outcomes are decided before animation starts. Animation only presents a resolved result.

Virtual credits are fictional integers. Never treat them as real money.

## Model routing

Keep ordinary work on the parent agent. Delegate hard architecture, React/Pixi integration design, performance, difficult debugging, and major refactor decisions to `/senior-architect` only.

## Working style

Inspect before editing. Prefer small reviewable steps. Do not regenerate the whole app in one pass. Verify with `npm run lint`, `npm test`, and `npm run build` before calling a feature done.
