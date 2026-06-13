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

- 🎯 **Hero section** — Terminal-themed hero with product value proposition
- 🔍 **Problem/Solution matrix** — Six pain points with Eskai's solutions
- ⚡ **Feature showcase** — Self-awareness, Sensory Cortex, Dream Cycle, Self-Repair, and 6+ capability categories
- 📊 **Case study** — Real-world proof of concept running BioThrive
- 💰 **Pricing** — Four tiers: Personal ($29/mo), Business ($99/mo), Vertical ($199/mo), Enterprise (custom)
- 📝 **Multi-step early access application form** — 3-step application with interest selection, use case description, and agreement
- 🌙 **Dark theme** — Glass-morphism design with gradient accents
- 📱 **Responsive** — Fully responsive from mobile to desktop

## Sections

1. **Navbar** — Fixed top navigation with smooth-scroll links
2. **Hero** — Value proposition, CTA buttons, interactive terminal visual
3. **Problem/Solution** — Pain point / solution comparisons
4. **Features** — "The Eskai Difference" and "What Eskai Can Do" (150+ tools)
5. **Case Study** — BioThrive launch: 87% directives completed, 2 dream cycles, 20 posts + 16 scripts
6. **Pricing** — 4 tiers with feature breakdowns
7. **Early Access Form** — Multi-step application for private beta
8. **Footer** — Links, company info, and branding

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

# Run the container
docker run -d -p 8080:80 eskai-landing:latest
```

### Using the Makefile

```bash
make build        # Build image with BuildKit caching
make run          # Run container on port 8080
make logs         # Tail container logs
make clean        # Stop and remove container + image
make run-d        # Run dev server locally (hot reload)
make build-no-cache  # Force clean rebuild
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
│       ├── Hero.tsx          # Hero with terminal visual
│       ├── ProblemSolution.tsx # Pain/solution comparison grid
│       ├── Features.tsx      # Feature cards grouped by category
│       ├── CaseStudy.tsx     # BioThrive proof-of-concept story
│       ├── Pricing.tsx       # 4-tier pricing cards
│       ├── ApplicationForm.tsx # 3-step early access form
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