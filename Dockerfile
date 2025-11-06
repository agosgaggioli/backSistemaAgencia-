# ===== Stage 1: build =====
FROM node:20-alpine AS builder
WORKDIR /app

# Instalar deps
COPY package*.json ./
RUN npm ci

# Copiar código y compilar
COPY tsconfig*.json ./
COPY src ./src
COPY nest-cli.json ./
RUN npm run build

# ===== Stage 2: run =====
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV TZ=America/Argentina/Cordoba

# Solo deps necesarias para runtime
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar build
COPY --from=builder /app/dist ./dist


EXPOSE 3009
CMD ["node", "dist/main.js"]
