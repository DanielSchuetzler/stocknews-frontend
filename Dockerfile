# ============================================================
# Multi-Stage Build: React Frontend mit Nginx
# Stage 1: npm install + vite build
# Stage 2: Nginx serviert die statischen Dateien
# ============================================================

# --- Stage 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Dependencies zuerst kopieren (Docker-Layer-Cache)
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Source-Code kopieren und bauen
COPY . .
RUN npm run build

# --- Stage 2: Nginx Runtime ---
FROM nginx:1.27-alpine

# Custom Nginx-Config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Built files aus Stage 1 kopieren
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
