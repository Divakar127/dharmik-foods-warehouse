# Dharmik Foods warehouse

Independent Next.js staff application for product CRUD, professional SKU identifiers, stock, galleries and image uploads, orders, customers, daily dashboard, banner ordering and visibility, and delivery PIN coverage.

## Run locally

Requires Node.js 20.9+ and npm. In this repository:

```powershell
npm ci
Copy-Item .env.local.example .env.local
npm run dev
```

Set `API_URL` in `.env.local` to the running backend URL (default `http://localhost:8000`). Set `WAREHOUSE_API_KEY` to the **same private value** configured in the backend. Open http://localhost:3001 and use that key to sign in. Never prefix this variable with `NEXT_PUBLIC_` or commit it. The Next.js server calls protected backend endpoints; the key is not embedded in browser bundles.

```powershell
npm run build
npm start
```

Deploy behind HTTPS and set the deployed warehouse origin in backend `CORS_ORIGINS`. Staff cookies are secure in production. The backend must be reachable from the Next.js server. This currently uses a shared staff key; individual staff accounts and roles are future work.

## Repository boundaries

This repository owns every source module and asset required for its build. `src/shared` is local app code, not an external dependency. API model copies must be coordinated with backend changes. No sibling checkout or monorepo root is needed.

- [Backend](https://github.com/Divakar127/dharmik-foods-backend)
- [Storefront](https://github.com/Divakar127/dharmik-foods-storefront)

The services communicate through HTTP. Live management requires the backend, but installation and builds do not require its source files.

Banner artwork should be 1500 × 536px to fill the storefront without losing content. Different proportions crop to fill. Editors control slide order, visibility, destinations, timing and uploads. Images can use backend local storage or configured Azure Blob Storage. AI campaign imagery is illustrative; representative photo source/license records are included in `src/shared/photo-manifest.json`.

Do not commit `.env.local`, access keys, uploaded customer data or build output. GitHub Actions runs a standalone production build without private configuration.
