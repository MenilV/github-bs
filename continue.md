# GitHub BS — Continue Context

## Project Overview

Chrome extension that skins GitHub's dashboard (github.com/ and /dashboard) with a **Bosnian theme**: dark navy + gold accent palette, cultural quotes/widgets, Bosnian UI localization. The approach is **light-touch overlay**: inject new elements without displacing GitHub's native React-managed layout.

- **Name:** GitHub BS (Bosanski skin)
- **Repo:** https://github.com/MenilV/github-bs
- **Design ethos:** Dark navy (`#0a0e1a`) background, gold (`#f59e0b`) accents, subtle glow effects, Bosnian visual texture (quotes, ćevapi/rakija jokes, git.ba branding)

## Files & Roles

| File | Lines | Role |
|------|-------|------|
| `manifest.json` | 22 | Chrome V3 extension config. **Only fires on `github.com/` and `github.com/dashboard`** (authenticated-only paths). |
| `content.js` | 441 | Content script — injects widgets, localizes UI text, enhances activity feed, handles SPA nav |
| `styles.css` | 1074 | All styling — CSS variables for theme, 40+ rule blocks for GitHub component overrides |
| `icons/` | 3 files | 16/48/128px PNG icons |

## Architecture Decisions

### Overlay Container Pattern
All injected elements live inside a single `#ghbs-overlay` div appended to `document.body`. The overlay has `position: fixed; inset: 0; z-index: 9999; pointer-events: none` — children set `pointer-events: auto`. This bypasses GitHub's CSS transforms/containing-block issues entirely.

### Widget Positioning
Each widget panel uses **`position: fixed`** directly (not absolute inside overlay), with `z-index: 10000`:
- **Left panel** (`#ghbs-left-panel`): `left: 16px; top: 80px; width: 270px`. Contains weather widget + quote card.
- **Right panel** (`#ghbs-right-panel`): `right: 16px; top: 80px; width: 270px`. Contains chart, status, sticky note, trending.
- **Welcome banner** (`#ghbs-welcome-banner`): Centered below header, `max-width: 700px`.
- **Footer** (`#ghbs-footer`): `bottom: 0; left: 0; right: 0`.

### Render Timing
The `applySkin()` function now uses `waitForRendered(5000)` — polls via `requestAnimationFrame` until both `<header>` and `<main>`/`.application-main` are in the DOM, then proceeds. This waits for GitHub's React hydration to complete. Falls back after 5s timeout.

### Content Margin Strategy (RECENT CHANGE)
**Removed** the old margin-left/margin-right pushes on `.application-main`/`main`. GitHub content now flows entirely naturally — only minimal `padding-top` (80px) to clear the header + widgets. Widgets float on top without displacing layout.

### URL Scoping
- Manifest matches: `["*://github.com/", "*://github.com/dashboard"]`
- Runtime guard in `init()`: bails out if `pathname` is not `/` or `/dashboard`
- Double protection against extension activating on marketing pages, repo pages, etc.

### Localization
`localizeUI()` translates GitHub nav elements via:
1. Direct `data-content` attribute selectors (e.g., `[data-content="Dashboard"] → Nadzorna ploča`)
2. TreeWalker text-node replacement for visible text in header, main, sidebar

### Activity Feed Enhancement
`enhanceActivityFeed()` wraps `.news li` items with Bosnian badges (Push, Issue, PR, Star, Fork, Release, Komentar, Tim, Kreirano, Obrisano) detected via CSS class matching.

### SPA Handling
Listens for `turbo:render`, `pjax:end`, `popstate` events to re-apply skin on GitHub's client-side navigation.

## Current State (as of latest commit)

### Working
- Extension loads only on dashboard pages (manifest + runtime guard)
- Dark navy + gold theme applied to all GitHub elements (header, buttons, sidebar, boxes, tabs, inputs, avatars, etc.)
- Fixed-position widgets float on sides without disrupting GitHub layout
- Welcome banner displays username and Bosnian date
- Bosnian quotes rotate randomly
- Weather/Chart/Status/Sticky widgets display sample data
- Footer with "git.ba" branding
- Bosnian UI text translations for nav elements
- Feed items get Bosnian badges
- SPA navigation events handled

### Known Issues
1. **Widgets may overlap GitHub content** — especially on narrower viewports. The goal is to find the right balance of GitHub content shifting vs. overlay. Currently using `position: fixed` which means widgets cover whatever is underneath.
2. **No responsive text sizing** — widgets don't adapt well to zoom levels.
3. **Welcome banner position** needs refinement — `left: calc(270px + 32px)` assumes dashboard layout; may be off on non-standard viewports.
4. **Widget overflow on short viewports** — panels have `max-height: calc(100vh - 96px)` but don't handle internal overflow gracefully.
5. **No Persistence** — quotes/sticky messages change on every re-render (not a bug, but could be a feature).

### Recently Removed
- **Margin pushes** on GitHub content — was too disruptive, made dashboard look stretched
- **`.container-xl`/`.container-lg` max-width override** — was stretching content containers

## Git History

```
e531071 refactor: remove layout disruption, switch to light-touch injection
91d5eb0 fix: add runtime URL guard to prevent theming non-dashboard pages
1340bf7 chore: restrict extension to logged-in dashboard only
e4964f0 fix: pin widgets with position:fixed so they stay on viewport
4e0ea23 feat: initial Bosnian GitHub theme extension
```

## Git Config
- `user.name`: MenilV
- `user.email`: menil.vukovic@gmail.com
- Remote: `origin → git@github.com:MenilV/github-bs.git`
- Branch: `main`

## Next Steps (discussed with user)

1. **Smart injection timing** ✅ Done — `waitForRendered()` polls for GitHub's React hydration
2. **DOM structure scanning** ✅ Done — `scanAndInject()` detects sidebar, news feed, repo list, measures header/main dimensions
3. **Position widgets based on actual layout** — use scanned dimensions rather than hardcoded CSS `--ghbs-panel-width` and `--ghbs-panel-gap` values
4. **Handle GitHub's content shift** so widgets don't overlap important UI — shift GitHub content via padding only when there's room
5. **Expand coverage** to other authenticated pages (repo, PR, issues) with page-specific layouts

## Engineering Conventions (follow these)

- **Never mutate existing DOM nodes** that React manages. Only append new elements.
- **Always use `!important`** on positioning CSS rules to beat GitHub's specificity.
- **All positioning is fixed** — no absolute positioning that depends on parent context.
- **CSS variables** for theme consistency. All color/radius/shadow values come from `:root` vars.
- **Overlay pattern** for injection — single fixed container, individual panels inside with `position: fixed`.
- **Session context file**: `/Users/menilvukovic/.local/share/opencode/sessions/...` (check `session_list` for latest).
