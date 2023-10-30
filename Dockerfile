FROM node:alpine as development
WORKDIR /app

COPY package*.json ./

RUN npm install

FROM node:alpine as production
WORKDIR /app

COPY --from=development /app/package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD npm start