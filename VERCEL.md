# Vercel Deployment Guide

This monorepo contains multiple Next.js applications, each deployed as a separate Vercel project.

## Architecture

- **npm workspaces** for dependency management
- **Turborepo** for build orchestration
- **Vercel** for deployment (one project per app)

## Apps

| App | Root Directory | Next.js Version |
|-----|---------------|-----------------|
| dnd-beginner-guide | `apps/dnd-beginner-guide` | 16.2.2 |
| dnd-combat-tracker | `apps/dnd-combat-tracker` | 16.0.10 |
| dnd-spell-archive | `apps/dnd-spell-archive` | 15.1.4 |
| dnd-enemy-hoard-generator | `apps/dnd-enemy-hoard-generator` | 14.2.5 |

## Setting Up a Vercel Project for Each App

For each app listed above, create a **separate** Vercel project:

1. **Import** the `mushfichowdhury/dnd-tools` repository from GitHub.
2. **Set the Root Directory** to the app's folder:
   - `apps/dnd-beginner-guide`
   - `apps/dnd-combat-tracker`
   - `apps/dnd-spell-archive`
   - `apps/dnd-enemy-hoard-generator`
3. **Framework Preset** will auto-detect as Next.js from the `vercel.json` in each app folder.
4. **Build and install commands** are pre-configured in each app's `vercel.json` — no manual overrides are needed in the Vercel dashboard.

## How It Works

- Vercel sets the working directory to the app's Root Directory (e.g., `apps/dnd-beginner-guide`).
- The `installCommand` in each app's `vercel.json` runs `cd ../.. && npm install`, which navigates to the monorepo root and installs all workspace dependencies.
- The `buildCommand` runs `cd ../.. && npx turbo run build --filter=./apps/<app-name>`, which uses Turborepo to build only the target app.
- Turborepo caches build outputs, so unchanged apps are not rebuilt unnecessarily.

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
4. Create a new Vercel project with **Root Directory** set to `apps/<new-app-name>`.
