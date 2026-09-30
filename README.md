# Campus Coin — Frontend

React single-page app for **Campus Coin**, a student budgeting and expense-tracking platform. It talks to the Campus Coin REST API in [`../server`](../server).

## Features

- **Authentication** — register, login, "remember me" (localStorage vs. sessionStorage), protected routes
- **Dashboard** — balance summary, stat cards, budget vs. actual, top category, recent transactions, saving tips
- **Transactions** — add / edit / delete, filtering, pagination, AI-style category suggestions
- **Categories** — default and custom income/expense categories
- **Budgets** — monthly per-category limits with progress bars and budget alerts
- **Reports** — category breakdown and income-vs-expense charts (Recharts)
- **Insights** — generated monthly summaries with history and bookmarking
- **Profile** — academic year, monthly allowance baseline, savings goal
- **Admin dashboard** — platform stats and user management (admin role only)
- **UI polish** — light/dark theme, toasts, skeleton loaders, animated numbers, reduced-motion support

## Tech Stack

| Area | Library |
|---|---|
| Framework | React 18 |
| Build tool | Vite 6 |
| Routing | React Router 7 |
| HTTP | Axios |
| Forms / validation | React Hook Form, Zod |
| Charts | Recharts |
| Icons | Lucide React, Hugeicons |
| Dialogs | SweetAlert2 |
| Visual effects | OGL |

## Prerequisites

- Node.js 18+ and npm
- The backend running on `http://localhost:5000` (see [`../server/README.md`](../server/README.md))

## Getting Started

```bash
cd client
npm install
npm run dev
```

The app runs at **http://localhost:5173**.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Create a production build in `dist/` |

## API Connection

The Axios instance uses `baseURL: "/api"`. In development, `vite.config.js` proxies `/api` to `http://localhost:5000`, so no frontend `.env` is needed.

If your backend runs on another port, update the proxy target in `vite.config.js`:

```js
server: { port: 5173, proxy: { '/api': 'http://localhost:5000' } }
```

For production, serve `dist/` behind a reverse proxy that forwards `/api` to the backend, or change `baseURL` in `src/api/axiosInstance.js`. Make sure the backend's `CLIENT_URL` matches the frontend origin (CORS).

## Demo Accounts

Available after running `npm run seed` on the backend:

| Role | Email | Password |
|---|---|---|
| Student | `demo@campuscoin.app` | `Demo123!` |
| Admin | `admin@campuscoin.app` | `Admin123!` |

## Routes

| Path | Page | Access |
|---|---|---|
| `/home` | Landing page | Public |
| `/login`, `/register` | Auth pages | Public |
| `/` | Dashboard | Logged in |
| `/transactions` | Transactions | Logged in |
| `/budgets` | Budgets | Logged in |
| `/reports` | Reports | Logged in |
| `/categories` | Categories | Logged in |
| `/insights` | Insights | Logged in |
| `/profile` | Your Account | Logged in |
| `/admin` | Admin dashboard | Admin only |

## Project Structure

```
client/
├── index.html
├── vite.config.js
├── public/                  # favicon and logos
└── src/
    ├── main.jsx             # entry point
    ├── App.jsx
    ├── api/                 # Axios instance + per-resource API modules
    ├── animation/           # motion helpers and CSS
    ├── components/
    │   ├── admin/           # admin stats, user table
    │   ├── auth/            # login/register forms, brand panel
    │   ├── budgets/         # budget form, list, progress cards, alert watcher
    │   ├── categories/      # category list and modal
    │   ├── dashboard/       # dashboard widgets
    │   ├── insights/        # insight cards and history
    │   ├── layout/          # AppShell, Sidebar, Topbar, ThemeToggle
    │   ├── reports/         # charts
    │   ├── transactions/    # transaction form and list
    │   └── ui/              # Button, Card, Input, Select, Toast, Skeleton, ...
    ├── context/             # Auth, Theme, Toast, Alert providers
    ├── hooks/               # useAuth, useTransactions, useCountUp, ...
    ├── pages/               # route-level pages
    ├── routes/              # AppRoutes, ProtectedRoute, AdminRoute
    └── utils/               # formatters, validators, error helpers
```

## Authentication Notes

- On login the JWT is stored as `cc_token` and the user object as `cc_user` (localStorage if "remember me" is on, otherwise sessionStorage).
- An Axios request interceptor attaches `Authorization: Bearer <token>` to every request.
- The chosen theme is stored under `cc_theme`.

## Troubleshooting

- **API calls fail / 404 on `/api`** — the backend isn't running, or the proxy target in `vite.config.js` is wrong.
- **CORS errors** — set `CLIENT_URL` in the backend `.env` to `http://localhost:5173`.
- **Logged out unexpectedly** — tokens expire after 7 days; log in again.
