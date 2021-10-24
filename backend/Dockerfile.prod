FROM node:alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn run build

FROM node:alpine 
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY --from=builder /app/dist ./
EXPOSE 5000
ENTRYPOINT [ "yarn", "run", "start:prod" ]