# Stage 1: Build Angular
FROM node:22-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Build production SSR
RUN npm run build -- --configuration production

# Stage 2: Runtime (SSR)
FROM node:22-alpine

WORKDIR /app

# Copy only the final build
COPY --from=build /app/dist/calculacoes-ui ./dist

# Default port for Angular SSR
EXPOSE 4000

# Command to start the SSR server
CMD ["node", "dist/server/server.mjs"]