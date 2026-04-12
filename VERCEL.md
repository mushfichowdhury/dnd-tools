# Vercel Deployment Guide

This monorepo contains multiple Next.js applications. The **homepage** (`apps/dnd-homepage`) is the primary Vercel project — it serves as the hub and proxies requests to the individual tool deployments via Vercel rewrites.

## Architecture

- **npm workspaces** for dependency management
- **Turborepo** for build orchestration
- **Vercel** for deployment (one project per app)
- **Hub-and-proxy**: the homepage is the user-facing entry point; Vercel rewrites forward `/dnd-*/...` paths to each tool's own Vercel deployment

```
https://your-homepage.vercel.app/
├── /                          → Homepage (this app)
├── /dnd-beginner-guide/*      → proxied to dnd-beginner-guide.vercel.app
├── /dnd-combat-tracker/*      → proxied to dnd-combat-tracker.vercel.app
├── /dnd-spell-archive/*       → proxied to dnd-spell-archive.vercel.app
└── /dnd-enemy-hoard-generator/*  → proxied to dnd-enemy-hoard-generator.vercel.app
```

## Apps

| App | Root Directory | Role | Next.js Version |
|-----|---------------|------|-----------------|
| **dnd-homepage** | `apps/dnd-homepage` | **Primary hub** | 15 |
| dnd-beginner-guide | `apps/dnd-beginner-guide` | Character Creator | 16.2.2 |
| dnd-combat-tracker | `apps/dnd-combat-tracker` | Combat Tracker | 16.0.10 |
| dnd-spell-archive | `apps/dnd-spell-archive` | Spell Archive | 15.1.4 |
| dnd-enemy-hoard-generator | `apps/dnd-enemy-hoard-generator` | Enemy Horde Generator | 14.2.5 |

## Deployment Steps

### Step 1: Deploy each tool app first

For each tool app (`dnd-beginner-guide`, `dnd-combat-tracker`, `dnd-spell-archive`, `dnd-enemy-hoard-generator`):

1. **Import** the `mushfichowdhury/dnd-tools` repository from GitHub.
2. **Set the Root Directory** to the app's folder (e.g., `apps/dnd-beginner-guide`).
3. **Framework Preset** will auto-detect as Next.js from the `vercel.json` in each app folder.
4. **Build and install commands** are pre-configured in each app's `vercel.json`.
5. Note down the deployment URL for each app (e.g., `https://dnd-beginner-guide.vercel.app`).

### Step 2: Update the homepage rewrites

Once you have the actual deployment URLs for each tool, update `apps/dnd-homepage/vercel.json`:

```json
{
  "rewrites": [
    { "source": "/dnd-beginner-guide/:path*", "destination": "https://<actual-url>/:path*" },
    { "source": "/dnd-combat-tracker/:path*", "destination": "https://<actual-url>/:path*" },
    { "source": "/dnd-spell-archive/:path*", "destination": "https://<actual-url>/:path*" },
    { "source": "/dnd-enemy-hoard-generator/:path*", "destination": "https://<actual-url>/:path*" }
  ]
}
```

### Step 3: Deploy the homepage

1. **Import** the `mushfichowdhury/dnd-tools` repository from GitHub.
2. **Set the Root Directory** to `apps/dnd-homepage`.
3. The `vercel.json` in `apps/dnd-homepage` handles all configuration automatically.

## How It Works

- Vercel sets the working directory to the app's Root Directory (e.g., `apps/dnd-homepage`).
- The `installCommand` in each app's `vercel.json` runs `cd ../.. && npm install`, which navigates to the monorepo root and installs all workspace dependencies.
- The `buildCommand` runs `cd ../.. && npx turbo run build --filter=./apps/<app-name>`, which uses Turborepo to build only the target app.
- Turborepo caches build outputs, so unchanged apps are not rebuilt unnecessarily.
- The homepage's `rewrites` config acts as a reverse proxy — requests to `/dnd-beginner-guide/*` are transparently forwarded to the Character Creator's Vercel deployment.

## Adding a New App

1. Add the app under `apps/<new-app-name>/`.
2. Ensure it has a `package.json` with a unique `name` field.
3. Create a `vercel.json` in the app directory:
   ```json
   {
     "framework": "nextjs",
     "installCommand": "cd ../.. && npm install",
     "buildCommand": "cd ../.. && npx turbo run build --filter=./apps/<new-app-name>"
   }
   ```
4. Add a rewrite entry to `apps/dnd-homepage/vercel.json` for the new tool.
5. Add a tool card to `apps/dnd-homepage/src/app/page.tsx`.
6. Create a new Vercel project with **Root Directory** set to `apps/<new-app-name>`.
