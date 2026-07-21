# ABC Construction — Website & Client Portal

Marketing website and authenticated client portal for ABC Construction Pvt. Ltd.

## Features

- Public company website (Home, About, Services, Projects, Careers, Blog, FAQ, Contact)
- **Contact Us / Get a Free Quote** → Signup
- Signup & Login with JWT
- Client Portal: progress, milestones, payments, documents, messages, reports & certificates

## Run locally

```bash
# install frontend deps (from repo root)
npm install

# install API deps
npm install --prefix server

# run website + API together
npm run dev
```

- Website: http://localhost:5173
- API: http://localhost:5000

## Flow

1. Visit the website
2. Click **Contact Us** / **Get a Free Quote**
3. Create an account on Signup
4. You are redirected into the **Client Portal** (or use Login later)
