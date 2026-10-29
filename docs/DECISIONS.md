# Engineering decisions

## 2026-10-28 — Imperative Pixi GameView

Decision: React mounts and destroys one `GameView` class. The scene is not built with `@pixi/react`.

Why: Reel animation needs a stable 60 FPS loop. Driving Pixi objects through React reconciliation fights that goal and complicates StrictMode lifecycle cleanup.

Tradeoff: Less declarative scene JSX. Acceptable for a game canvas.

## 2026-10-28 — Zustand over Redux Toolkit

Decision: Zustand with a vanilla store for domain state.

Why: `GameController` must read and write state without React. The state surface is small. Redux Toolkit adds ceremony without enough benefit here.

Tradeoff: Smaller ecosystem than Redux. Fine for this app size.

## 2026-10-28 — Tailwind for HUD only

Decision: Tailwind CSS v4 styles React HUD. Pixi rendering stays independent of CSS utilities.

Why: The control surface is form-like and benefits from utility CSS. Canvas pixels do not.

## 2026-10-28 — Ancient Egypt theme

Decision: Night Nile / lapis / gold visual direction, not a Book of Ra clone.

Why: Classic slot genre that still allows a distinctive portfolio look if we avoid stock sand-yellow tropes.

Risk: Art quality dominates perceived polish. Build with placeholders first, replace assets in the polish phase.

## 2026-10-28 — Hosting on Vercel

Decision: Public deploy on Vercel with GitHub Actions CI later.

Why: Simple static frontend hosting and HTTPS for a portfolio URL.
