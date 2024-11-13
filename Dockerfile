# Stage 1: Build the app
FROM node:22-alpine AS builder
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .

# Stage 2: Create a smaller production image
FROM node:22-alpine
WORKDIR /usr/app
COPY --from=builder /usr/app .
EXPOSE 4000
CMD ["npm", "start"]
