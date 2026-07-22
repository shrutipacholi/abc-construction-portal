# ABC Construction — Website & Client Portal

Marketing website + MySQL-backed client/admin portal for ABC Construction Pvt. Ltd.

## Links

- **Live:** https://construction-site-two-chi.vercel.app
- **GitHub:** https://github.com/shrutipacholi/abc-construction-portal

## Features

- Public company website
- Contact Us → Signup → Client Portal (personal data only)
- Admin console to assign projects to clients
- Document/photo uploads stored in MySQL
- MySQL schema with seed data (3–4+ rows per table)

## Demo logins

| Role | Email | Password |
|------|--------|----------|
| Admin | admin@abcconstruction.com | Admin@123 |
| Client | client@test.com | secret1 |
| Client | ananya@example.com | Demo@123 |
| Client | rohan@example.com | Client@123 |
| Client | meera@example.com | Build@123 |

- Client login → `/portal`
- Admin login → `/admin`

## Local run (one site only)

Use **one URL** for everything:

**http://localhost:5173**

| Page | Path |
|------|------|
| Website | `/` |
| Login | `/login` |
| Client portal | `/portal` |
| Admin panel | `/admin` |

Website, portal, and admin are the **same app** — just different pages. Do not open `localhost:5000` in the browser (that is the API only; Vite proxies `/api` for you).

```bash
start-mysql.bat
npm install
npm install --prefix server
npm run db:init
npm run db:migrate
npm run dev
```

If the site won’t start on 5173, stop other old `npm run dev` / Vite windows first — otherwise you may see duplicate ports like 5174 / 5175.
