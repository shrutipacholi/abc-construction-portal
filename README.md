# ABC Construction — Website

React marketing site with a **Java Spring Boot** API.

## Local run

```bash
npm install
npm run dev
```

Open **http://localhost:5173**

| Page | Path |
|------|------|
| Website | `/` |
| Get Quotation | `/quotation` |

- Frontend: Vite on port `5173` (proxies `/api` → Java)
- Backend: Java Spring Boot on port `5000`

### Backend only

```bash
cd server
mvnw.cmd spring-boot:run
```
