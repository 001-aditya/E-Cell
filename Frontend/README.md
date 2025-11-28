# E-Cell Web App (React + Vite)

Frontend for the Entrepreneurship Cell portal. It uses Supabase for authentication, blogs, team management, and event registrations.

## Getting started

```bash
cd Frontend
npm install
npm run dev
```

Create a `.env` file and add your Supabase credentials:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Run the SQL from `Backend/supabase-schema.sql` inside the Supabase SQL editor to provision the required tables and RLS policies.

## Available scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint (React rules + hooks) |

## Tech stack

- React 19 + `createBrowserRouter`
- Supabase JS client
- TailwindCSS with shadcn-inspired components
- Protected routes for dashboard/admin
- Reusable form styles + Supabase CRUD flows for blogs, team, events
