# GitHub BS — Handoff Context for Antigravity

## Project Overview
Chrome extension that skins GitHub's authenticated dashboard with a **Bosnian theme**: dark navy + gold accent palette, cultural quotes/widgets, and Bosnian UI localization.

- **Name:** GitHub BS (Bosanski skin)
- **Target Audience:** Developers who appreciate Bosnian humor, ćevapi, and rakija.
- **Design Ethos:** Dark navy (`#0a0e1a`) background, gold (`#f59e0b`) accents, native GitHub DOM integration, clean UI but culturally funny.

## 🏗️ Architecture & Recent Refactors (CRITICAL)

The project recently underwent major architectural shifts. Please read these carefully before modifying the DOM or adding features:

1. **Native DOM Integration (No more fixed overlays)**
   - Widgets are no longer floating in a `position: fixed` overlay.
   - We now inject directly into GitHub's native layout:
     - **Sidebar (`.dashboard-sidebar`)**: Stats, Status, Trending widgets.
     - **News Feed (`.news`)**: Welcome Banner, Weather, and Proverbs (Grid layout).
   - *Why?* This relies on GitHub's native spacing and prevents widgets from awkwardly overlapping main content on different screen sizes.

2. **React-Safe Localization (Avoiding Infinite Loops)**
   - **THE TRAP:** GitHub uses React. If you naively use `element.textContent = "Novi tekst"`, you will destroy the React-managed SVG icons inside buttons. React will panic, re-render the button, trigger our `MutationObserver`, and cause a fatal infinite loop.
   - **THE SOLUTION:** `localizeUI()` now uses a highly specific `TreeWalker` and explicitly checks `Node.TEXT_NODE`. We *only* replace text nodes.
   - Example: The "New" repository button is translated to **"Novi belaj 🚀"** by specifically targeting `a[href="/new"] .Button-label` and cleanly swapping just the text node.

3. **Strict URL Scoping**
   - The extension is strictly bound to `github.com/` and `github.com/dashboard` (Manifest `matches` + `content.js` runtime checks).
   - It also requires the user to be logged in (checks for `meta[name="user-login"]`).
   - *Rule:* Do not expand to repo pages or marketing pages without explicit user permission. It is meant to be a dashboard experience.

4. **Dynamic SPA Handling**
   - GitHub uses Turbo/Pjax. The extension listens for `turbo:render`, `pjax:end`, and `popstate` to re-apply the skin.
   - A `MutationObserver` watches for dynamically injected content (e.g., lazy-loaded sidebars or new feed items) and safely re-runs `localizeUI()` and `enhanceActivityFeed()`.

## 📦 Current Features

- **Theme**: Dark navy/gold applied via CSS variables. Hover glows and slight vertical lift on widget cards.
- **Widgets**:
  - Welcome Banner (Username + Bosnian Date)
  - Weather (Currently static Sarajevo weather)
  - 2x Proverbs Cards (Random selection from `BOSNIAN_QUOTES`)
  - Stats Chart (Static sample data)
  - Status Box (GitHub, API, Ćevapi, Rakija)
  - Sticky Note (Random from `STICKY_MESSAGES`)
  - Trending Repos (Placeholder)
  - Footer ("git.ba")
- **Activity Feed**: Badges added to feed items (Push, Issue, PR, Star, Fork, etc.).
- **Localization**:
  - Massive `textMap` translating GitHub UI to Bosnian.
  - Regex-based relative time translation (e.g., "15 hours ago" -> "prije 15 sati").

## 🚀 Next Steps / Ideas for Antigravity

The user requested: *"improve the funny effect but to still keep a nice clean ui and structure"*

Here are approved concepts to explore next:

1. **"Balkan Commit" Generator Widget**:
   - Add a sleek widget with a button: "Nemam inspiracije" (I have no inspiration).
   - Generates funny Bosnian commit messages (e.g., `fix: proradilo samo od sebe`, `chore: bogzna šta je ovo`) with a click-to-copy feature.
2. **Developer Ranks in Welcome Banner**:
   - Assign a dynamic title next to the user's name (styled like GitHub's "Pro" badge).
   - Examples: `[Senior Burek Majstor]`, `[Rakija Driven Developer]`.
3. **"Do Kafe" (Until Coffee) Tracker**:
   - Replace one of the duplicate Proverb widgets with a clean progress bar tracking the time until the next coffee break.
4. **Emoji Polish**:
   - Inject subtle emojis into the Status widget or activity feed for instant visual humor.
5. **Real Data Integration**:
   - Fetch real weather data for Sarajevo or real GitHub trending repos, replacing the current static placeholders.

## ⚠️ Important Rules for Modifying

- **NEVER** use generic `innerHTML` or `textContent` overwrites on GitHub's native buttons/headers. Always target `Node.TEXT_NODE`.
- Maintain the `.ghbs-active` class structure in CSS.
- Ensure all custom CSS selectors are heavily weighted (`!important` or high specificity) to beat GitHub's native utility classes (Primer).
- Always verify changes don't break the `MutationObserver`. If the tab freezes, you've caused an infinite render loop with React.

Good luck! 🇧🇦🚀
