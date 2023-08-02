FROM node:18-alpine AS dev
WORKDIR /app
COPY package*.json .
RUN npm ci --only=development && npm cache clean --force
COPY . .
RUN npm run build

FROM node:18-alpine as prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]
