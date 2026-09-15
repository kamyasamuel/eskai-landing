# Eskai Landing Page

**Eskai** — Your AI Business Operating System.

A marketing landing page for Eskai, the first AI Operating System for businesses. Built by [Eskaen Technologies](https://eskaen.com).

## Overview

Eskai is an autonomous AI assistant that knows who you are, watches your operations, executes your tasks, and runs strategic planning cycles to make your business smarter over time. This repository contains the public-facing landing page where users can learn about Eskai and apply for early access.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS 3** | Utility-first styling |
| **Lucide React** | Icon library |
| **Docker** | Containerized deployment |
| **Nginx** | Production web server |

## Features

- 🎯 **Hero section** — Plain-language value proposition with a chat-style product visual
- 🔍 **Problem/Solution matrix** — Eight everyday business pain points with Eskai's answers
- ⚡ **Feature showcase** — "What Eskai Does For You" and "What It Can Do" (150+ tools behind one chat)
- 🚚 **How You Get It** — Order → we configure it → it arrives ready → you message it
- 📊 **Case study** — Real story: BioThrive's launch plan, asked on Monday, delivered by Tuesday
- 💰 **Pricing** — One-time hardware + setup: Personal ($199), Business ($599), Custom (from $2,500). Optional Care Plan ($9/$29 per month) plus token spend (bring your own API key or prepaid credits). No subscription.
- 📝 **Multi-step reservation form** — 3-step form with plan interest, location, payment preference and use case
- 🌙 **Dark theme** — Glass-morphism design with gradient accents
- 📱 **Responsive** — Fully responsive from mobile to desktop

## Sections

1. **Navbar** — Fixed top navigation with smooth-scroll links
2. **Hero** — Value proposition, CTA buttons, chat-style product visual (+ a terminal strip for technical readers)
3. **Problem/Solution** — Pain point / solution comparisons in plain language
4. **Features** — "What Eskai Does For You" and "What It Can Do"
5. **How You Get It** — Delivery and setup steps
6. **Case Study** — BioThrive launch: 20 posts + 16 scripts, under 24 hours
7. **Pricing** — One-time hardware + setup: Personal ($199), Business ($599), Custom (from $2,500) + optional Care Plan and token spend
8. **Reservation Form** — Multi-step form to reserve a device
9. **Footer** — Links, company info, and branding

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Development

```bash
# Install dependencies
npm ci

# Start development server
npm run dev
```

The development server runs at `http://localhost:3000`.

### Build

```bash
# Build static export
npm run build

# The output will be in the `out/` directory
```

### Lint

```bash
npm run lint
```

## Docker Deployment

The project includes a multi-stage Dockerfile with BuildKit cache mounts for fast incremental builds and an Nginx production server.

### Prerequisites

- Docker with BuildKit enabled (default on Docker Desktop / Docker Engine 23+)

### Quick Start (Docker Compose)

```bash
# Build and run (one command)
docker compose up -d

# Stop and remove
docker compose down
```

### Quick Start (Docker CLI)

```bash
# Build with BuildKit cache mounts
DOCKER_BUILDKIT=1 docker build -t eskai-landing:latest .

# Run the container (mounts the named volume so data persists)
docker run -d -p 8080:80 -v eskai-landing_data:/app/data eskai-landing:latest
```

> ⚠️ **Never run without the `-v eskai-landing_data:/app/data` volume.** Without
> it, the SQLite DB lives in the container's ephemeral layer and is destroyed on
> `docker rm` / container recreation.

### Using the Makefile

```bash
make build        # Build image with BuildKit caching
make run          # Run container on port 8080 (volume mounted)
make logs         # Tail container logs
make clean        # Stop and remove container (volume + data kept)
make run-d        # Run dev server locally (hot reload)
make build-no-cache  # Force clean rebuild
make backup       # Backup SQLite volume to backups/
make restore FILE=backups/<file>.tar.gz  # Restore from a backup
make deploy       # Backup + rebuild + recreate (data-safe)
```

> ⚠️ `make clean` no longer removes the image (it only stops/removes the
> container), so the named volume and your data are always preserved.
> To fully wipe everything including data, use `docker compose down -v`
> **only if you intend to delete all data**.

### Data Persistence

The app stores its SQLite database at `/app/data/eskai.db` inside the container
(early-access applications, page views, events, API keys, admin users). The
`docker-compose.yml` declares a **named volume `eskai-landing_data` mounted at
`/app/data`**, so **all data survives `docker compose up -d --build` and
container recreation**.

> First deploy with the volume: the volume starts empty, so migrate any existing
> data first:
>
> ```bash
> # 1) Before recreating, copy the DB out of the running container
> docker cp eskai-landing:/app/data ./data-backup
> # 2) After `docker compose up -d --build` with the new volume, restore it
> docker cp ./data-backup/. eskai-landing:/app/data/
> docker compose restart landing
> ```

Backup / restore the whole volume (or use `make backup` / `make restore`):

```bash
# Backup
docker run --rm -v eskai-landing_data:/data -v "$PWD/backups":/backup \
  alpine tar czf /backup/eskai-data-$(date +%F).tar.gz -C /data .

# Restore
docker run --rm -v eskai-landing_data:/data -v "$PWD":/backup \
  alpine tar xzf /backup/eskai-data-<date>.tar.gz -C /data
```

> The volume's full name is `eskai-landing_data`. Verify with `docker volume ls`.

**Safe redeploy** (backs up first, then rebuilds via compose — volume preserved):

```bash
make deploy
```

### Speed Comparison

| Build | Without cache | With BuildKit cache mounts |
|-------|--------------|---------------------------|
| 1st build | ~10 min | ~10 min (populates caches) |
| 2nd build (same deps) | ~10 min | **~40s** |
| Subsequent rebuilds | ~10 min | **~0.5s** (fully cached) |

Caches are kept in Docker's BuildKit cache storage — they persist across rebuilds even after `docker system prune`.

### Architecture

**Build stages:**

1. **Builder stage** (`node:20-alpine`) — installs dependencies and runs `next build`
   - `--mount=type=cache,target=/root/.npm` — npm packages cached across builds
   - `--mount=type=cache,target=/app/.next/cache` — Next.js SWC/Turbopack compiled output cached
2. **Serve stage** (`nginx:alpine`) — serves the static export from `/usr/share/nginx/html`

**Nginx is configured with:**
- Gzip compression for text, fonts, and SVG assets
- Security headers (X-Frame-Options, X-Content-Type-Options, XSS-Protection, Referrer-Policy, Permissions-Policy)
- Content Security Policy (CSP)
- Long-term caching for `/_next/static` (365 days, immutable)
- Explicit favicon handling (no 404s)
- SPA fallback via `try_files`

## Project Structure

```
eskai-landing/
├── src/
│   ├── app/
│   │   ├── globals.css      # Tailwind directives, custom utilities, glass/gradient styles
│   │   ├── layout.tsx       # Root layout with metadata & SEO
│   │   └── page.tsx         # Home page composing all sections
│   └── components/
│       ├── Navbar.tsx        # Fixed navigation with mobile menu
│       ├── Hero.tsx          # Hero with chat visual + terminal strip
│       ├── AlreadyUsing.tsx  # Social proof stats, industries, avatars
│       ├── ProblemSolution.tsx # Pain/solution comparison grid
│       ├── Features.tsx      # Feature cards grouped by category
│       ├── HowYouGetIt.tsx   # Delivery & setup steps
│       ├── CaseStudy.tsx     # BioThrive story
│       ├── Pricing.tsx       # 3-tier hardware pricing + cost explainer
│       ├── ApplicationForm.tsx # 3-step reservation form
│       └── Footer.tsx        # Footer with links & branding
├── Dockerfile               # Multi-stage Docker build with BuildKit cache mounts
├── docker-compose.yml       # Docker Compose orchestration
├── Makefile                 # Convenience targets for build/run/clean
├── nginx.conf               # Nginx server configuration
├── next.config.js           # Next.js config (static export)
├── tailwind.config.ts       # Tailwind theme configuration
├── tsconfig.json            # TypeScript configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies & scripts
```

## Configuration

- **`next.config.js`** — Configured for static export (`output: 'export'`) with unoptimized images
- **`tailwind.config.ts`** — Custom color palette (brand, dark shades), font families (Inter, JetBrains Mono), animations
- **`nginx.conf`** — Production web server with caching, compression, and security headers
- **`.dockerignore`** — Excludes `node_modules`, `.git`, `out/`, and build artifacts

## About Eskaen Technologies

Eskai is built by [Kamya Samuel](https://kamyasamuel.com), founder of Eskaen Technologies. The product was born from running a real business — [BioThrive](https://bio.eskaen.com) (biological fertilizer and fungicide) — where the need for an autonomous operations AI became undeniable.

**Links:**
- [Eskaen Technologies](https://eskaen.com)
- [BioThrive](https://bio.eskaen.com)
- [Contact](mailto:kamyasamuel@eskaen.com)

## License

© 2026 Eskaen Technologies Ltd. All rights reserved.