# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React + TypeScript + Vite scaffold for a Zustand state-management mini-course ("zustand-mini-curso"). It is a teaching/practice project: pages are organized by lesson topic and are meant to be progressively wired up to Zustand stores as the course advances. Stack: React 18, React Router DOM 6, TailwindCSS, react-icons.

**Note:** `zustand` is not yet listed in `package.json` dependencies — the store logic for each lesson page is expected to be added as an exercise (`npm install zustand` first).

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — type-check (`tsc`) then build with Vite
- `npm run lint` — ESLint over `.ts`/`.tsx`, zero warnings allowed (`--max-warnings 0`)
- `npm run preview` — preview the production build

There is no test runner configured in this project.

## Architecture

- **Routing** (`src/router/router.tsx`): a single `createBrowserRouter` tree rooted at `Root` (`src/Root.tsx`), which redirects `/` → `/dashboard`. Two layout branches:
  - `dashboard/*` → `DashboardLayout` (sidebar + outlet), containing the lesson pages
  - `auth/*` → `AuthLayout`, containing `LoginPage`
- **Lesson pages** (`src/pages/`), each demonstrating a different Zustand pattern, matching the sidebar items in `SideMenu.tsx`:
  - `01-basic/BearPage.tsx`, `01-basic/PersonPage.tsx` — simple/basic store usage
  - `02-objects/JiraPage.tsx` (uses `JiraTasks` component) — state managed as objects
  - `03-slices/WeddingInvitationPage.tsx` — Zustand slices pattern
  - `dashboard/DashboardPage.tsx` — landing page
  - `auth/LoginPage.tsx` — standalone auth page
  - All pages are re-exported through `src/pages/index.ts`; import pages from there, not from their nested file paths.
- **Shared components** (`src/components/`), re-exported via `src/components/index.ts`:
  - `shared/cards/WhiteCard.tsx` — generic card wrapper used across lesson pages
  - `shared/sidemenu/SideMenu.tsx` + `SideMenuItem.tsx` — dashboard navigation; the `menuItems` array here is the source of truth for sidebar links and must stay in sync with routes defined in `router.tsx`
  - `jira/JiraTasks.tsx` — column component for the Jira-style task board lesson
- Path aliases are not configured — imports use relative paths (`../../components`, etc.).
- Styling is TailwindCSS utility classes; `SideMenu.css` is the only page-level CSS file outside of Tailwind/`index.css`.
