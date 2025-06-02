# Stage 1: Build the app
FROM node:22-alpine AS builder
WORKDIR /usr/app
COPY package*.json .
RUN npm install && npm cache clean --force
COPY . .

# Stage 2: Create a smaller production image
FROM node:22-alpine
WORKDIR /usr/app
COPY --from=builder /usr/app .
RUN npx prisma generate
EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]
