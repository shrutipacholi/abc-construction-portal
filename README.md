# ABC Construction — Website & Client Portal

Marketing website and authenticated client portal for ABC Construction Pvt. Ltd.

## Features

- Public company website (Home, About, Services, Projects, Careers, Blog, FAQ, Contact)
- **Contact Us / Get a Free Quote** → Signup
- Signup & Login with JWT
- Client Portal backed by **MySQL** (personal data only per user)

## Quick start (local)

```bash
# 1) Start local MySQL (port 3307)
start-mysql.bat

# 2) (first time only) create tables + seed data
npm run db:init

# 3) Run website + API
npm run dev
```

- Website: http://localhost:5173
- Login: http://localhost:5173/login
- API: http://localhost:5000

### Demo logins (from MySQL seed)

| Email | Password |
|--------|----------|
| client@test.com | secret1 |
| ananya@example.com | Demo@123 |
| rohan@example.com | Client@123 |
| meera@example.com | Build@123 |

Each user only sees their own projects and portal data.

## Database

Tables: `users`, `quote_requests`, `projects`, `milestones`, `payments`, `documents`, `messages`, `notifications`

Local MySQL credentials are in `.env` (not committed). Default local instance:

- Host: `127.0.0.1`
- Port: `3307`
- User: `root`
- Database: `abc_construction`
