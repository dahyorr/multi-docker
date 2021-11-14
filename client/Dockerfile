FROM node:lts-alpine as builder
WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY ./ ./

RUN mkdir build && chmod -R 777 ./build

USER node
RUN npm run build

FROM nginx:1.21.3-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
