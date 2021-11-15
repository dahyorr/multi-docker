FROM node:lts-alpine
WORKDIR /app

EXPOSE 5000

COPY ./package.json ./
RUN npm install

COPY ./ ./

USER node

CMD ["npm", "start"]