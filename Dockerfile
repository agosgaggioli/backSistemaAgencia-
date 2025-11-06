# ===== Stage 1: build =====
# ===== Stage 1: build =====
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src
RUN npm run build

# ===== Stage 2: run =====
FROM node:20-alpine AS runner
WORKDIR /app

# Paquetes básicos para TLS y zona horaria
RUN apk add --no-cache ca-certificates tzdata && update-ca-certificates

ENV NODE_ENV=production
ENV TZ=America/Argentina/Cordoba

# Solo deps de runtime
COPY package*.json ./
RUN npm ci --omit=dev

# Copiamos el build
COPY --from=builder /app/dist ./dist

# (Opcional) asegurá permisos y user no-root
# RUN addgroup -S app && adduser -S app -G app
# USER app

EXPOSE 3009
CMD ["node", "dist/main.js"]
