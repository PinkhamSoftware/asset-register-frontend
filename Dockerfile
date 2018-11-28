FROM node:10.12.0-alpine

RUN apk --no-cache add git

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

ADD . /app

CMD npm start
