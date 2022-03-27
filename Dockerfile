FROM node:16-alpine

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN apk add git

RUN yarn

COPY . .

CMD ["yarn", "start"]