# Stage 1: Build Angular
FROM node:22-alpine AS build

WORKDIR /app

# Copia apenas arquivos de dependência (cache)
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Build SSR de produção
RUN npm run build -- --configuration production

# Stage 2: Runtime (SSR)
FROM node:22-alpine

WORKDIR /app

# Copia apenas o build final
COPY --from=build /app/dist/calculacoes-ui ./dist

# Porta padrão do Angular SSR
EXPOSE 4000

# Comando que sobe o servidor SSR
CMD ["node", "dist/server/server.mjs"]