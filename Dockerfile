# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Enable Corepack for package manager (optional, good practice)
ENV COREPACK_ENABLE_STRICT=0

# Install build dependencies for better-sqlite3 native module
RUN apk add --no-cache python3 make g++

# Copy package files first — changes infrequently, layers cache well
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline

# Copy source code (changes frequently, separate layer)
COPY . .

# Build with BuildKit cache for Next.js compiled output
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# ---- Production Stage ----
FROM node:20-alpine AS server

WORKDIR /app

# Install runtime dependencies for better-sqlite3 native module
RUN apk add --no-cache python3 make g++

# Copy only production dependencies
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --production

# Copy build output and public assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

# Create data directory for SQLite database
RUN mkdir -p /app/data

# Set environment variables
ENV NODE_ENV=production
ENV DB_PATH=/app/data/eskai.db

EXPOSE 80

CMD ["node_modules/.bin/next", "start", "-p", "80"]
