# Dockerfile para proyecto Next.js con pnpm
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos
COPY . .

# Instalar dependencias
RUN pnpm install

# Build del proyecto
RUN pnpm build

# Producción
FROM node:18-alpine AS runner
WORKDIR /app

# Instalar pnpm en la imagen final también
RUN npm install -g pnpm

# Copiar desde la build
COPY --from=builder /app ./

EXPOSE 3001

CMD ["pnpm", "start"]
