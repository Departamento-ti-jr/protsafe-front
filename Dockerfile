# Etapa 1: build da aplicação
FROM node:22-alpine AS builder

WORKDIR /app

# Instala dependências do sistema (caso tenha dependências nativas)
RUN apk add --no-cache python3 make g++

# Ativa o corepack e prepara o pnpm
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

# Copia os arquivos de dependência
COPY package.json pnpm-lock.yaml ./

# Instala dependências com pnpm
RUN pnpm install

# Copia o restante da aplicação
COPY . .

# Gera o build de produção do Next.js
RUN pnpm build

# Etapa 2: imagem de produção
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Ativa o corepack e o pnpm também aqui (caso precise rodar algo no runtime)
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

# Copia apenas os arquivos necessários para rodar a app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

# Comando de inicialização
CMD ["pnpm", "start"]
