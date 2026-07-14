# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**GearHub** is a single-vendor e-commerce app for gaming gear (mice, keyboards, headsets, microphones). It is a two-package monorepo — there is **no root `package.json`**. Each package is installed and run independently:

- `app/api/` — Express + Mongoose REST API (CommonJS, Node.js). Listens on port 5000.
- `app/web/` — React 19 + Vite SPA (ESM, `"type": "module"`). Dev server on port 5173.

The backend also serves the built frontend in production: `server.js` mounts `app/web/dist` as static files, so in a production build everything runs on port 5000 (the SPA fallback returns `dist/index.html`).

## Common Commands

### Backend (`app/api`)
```bash
cd app/api
npm install
npm run dev        # nodemon — hot-reload API on port 5000
npm start          # run server.js once
node scripts/seed.js   # wipe + reseed users & products (see note below)
```
Requires `app/api/.env` with `PORT`, `MONGO_URI`, `JWT_SECRET`. `.env` is gitignored.

### Frontend (`app/web`)
```bash
cd app/web
npm install
npm run dev        # Vite dev server on http://localhost:5173
npm run build      # outputs to app/web/dist
npm run preview    # serve the built dist locally
npm run lint       # oxlint (uses app/web/.oxlintrc.json, react + oxc plugins)
```
There is **no test framework** wired up in either package.

### Seeding
`node scripts/seed.js` deletes and re-inserts all `users` and `products`, then `process.exit()`s. Note: order seeding is intentionally **skipped** (the seeded users now get auto-generated `_id`s, so the hardcoded order references would be invalid) — only users and products are populated. After seeding, log in with:
- Admin: `admin.1@gearhub.com` / `Admin@1234`
- Customer: `gamer.1@example.com` / `User@1234`

## Architecture

### API layer (`app/api`)
- `server.js` wires middleware and routes. Global middleware: `cors()`, `express.json()`, then `checkDbConnection` on `/api`, then the three routers (`/api/auth`, `/api/products`, `/api/orders`).
- `middlewares/dbCheckMiddleware.js` — gates every `/api` request; returns a 503-style failure if Mongo isn't connected (so the API degrades gracefully rather than throwing).
- `middlewares/authMiddleware.js` exports `protect` (validates `Authorization: Bearer <token>`, loads `req.user` minus password) and `admin` (must follow `protect`; checks `req.user.role === 'admin'`). Admin routes chain `protect, admin`.
- **Response envelope convention:** all controllers return JSON shaped as `{ success: true|false, ... }` — consumers (frontend fetch calls) branch on `res.success`. Keep this shape when adding endpoints.
- **Security-critical controllers:** `orderController.createOrder` recomputes price/total **server-side** (never trusts client-sent prices) and decrements stock atomically via `findOneAndUpdate({ _id, stock: { $gte: qty } }, { $inc: { stock: -qty } })` to avoid race conditions. `productController` review logic enforces one review per username per product. `authController.register` forces `role: 'customer'` — admins only exist via seed or direct DB edits.

### Frontend layer (`app/web/src`)
- **API calls use relative `/api/...` paths** (e.g. `fetch('/api/products')`). In dev, `vite.config.js` proxies `/api` → `http://localhost:5000`. Never hardcode `localhost:5000` in frontend code; rely on the proxy or the production same-origin serve.
- **State via React Context** (all under `src/context/`): `AuthContext` (holds JWT token from `localStorage` + current user, validates token against `/api/auth/me` on load), `CartContext`, `CompareContext` (max 3 items, highlights best spec), `WishlistContext`, `ToastContext`. `Cart` and `Wishlist` persist to `localStorage`; `Auth` token also lives in `localStorage`.
- Routing is `react-router-dom` v7; pages live in `src/pages/`. `AdminDashboard.jsx` is the only admin surface and calls admin-protected endpoints directly.
- Styling is **vanilla CSS** (`src/index.css`, dark glassmorphism theme) with `lucide-react` icons — no CSS framework.

### MongoDB schemas (`app/api/models`)
`User` (bcrypt pre-save hook, `saltRounds=10`), `Product` (nested `specifications` object whose keys vary by `category` — `sensor`/`pollingRate` for Mouse, `switchType`/`hotSwappable` for Keyboard, `batteryLife` for Headset, `polarPattern`/`frequencyResponse`/`formFactor` for Microphone; plus embedded `reviews[]`), `Order` (embedded `items[]` snapshots + `shippingAddress` + `status` enum `Pending|Paid|Processing|Shipped|Delivered|Cancelled`).

## Notes
- `.gitignore` excludes `app/api/.env`, `app/web/dist/`, `design-system/`, and `.agents/`. The `design-system/gearhub/` and `.agents/skills/` directories contain AI/design agent assets (brand, banner, ui-ux, slides) — they are not part of the running app and are intentionally untracked.
- Code comments throughout the codebase are written in Thai; keep new comments consistent with that convention when editing existing files.
