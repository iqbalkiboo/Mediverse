# Stage 1: build production bundle
FROM node:18-buster as builder

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

# Stage 2: serve the production bundle
FROM node:18-buster

WORKDIR /app
RUN yarn global add serve
COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]