FROM node:18-alpine
WORKDIR /app
COPY package*.json .
COPY dist dist
ENV NODE_ENV=production
RUN npm install
CMD ["node", "dist/main.js"]
EXPOSE 4000