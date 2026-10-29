# Architecture

Status: draft for Phase 0. Update when implementation changes.

## Goals

- Keep game rules testable without React or PixiJS.
- Keep 60 FPS animation off the React render path.
- Leave a clean seam for a future server-authoritative `SpinService`.

## Layers

```text
React UI  →  GameController  →  SpinService / engine
                 ↓
              Zustand store (domain state only)
                 ↓
              Pixi GameView (presentation only)
```

### Engine

Pure TypeScript. Symbols, reel strips, paylines, payouts, RNG interface, and explicit game-phase transitions live here.

### Game

`GameController` asks `SpinService` for a result, updates domain state, and tells the view what to present. `LocalSpinService` runs in the browser today. `HttpSpinService` can replace it later without changing the UI.

### Render

One imperative Pixi `GameView` owned by a thin React mount component. Reel positions and tween progress stay inside Pixi. `@pixi/react` will be removed in the rendering phase.

### State

Zustand vanilla store for balance, bet, phase, last win, history, and settings. No frame-by-frame animation fields.

## Suggested phases

`BOOTING → LOADING_ASSETS → IDLE → SPIN_REQUESTED → SPINNING → STOPPING → PRESENTING_WIN → IDLE`

Error recovery returns to `IDLE` when safe. Duplicate spins are rejected unless the machine is in `IDLE`.
