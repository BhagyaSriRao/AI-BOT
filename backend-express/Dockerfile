FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
COPY . .
RUN npm ci --silent
EXPOSE 8003
CMD ["node", "server.js"]
