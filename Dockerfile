# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install ALL dependencies (dev deps needed for build)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the static export
RUN npm run build

# ---- Serve Stage ----
FROM nginx:alpine

# Copy the static export to nginx html directory
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
