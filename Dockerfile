FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

ENV MODE prod

CMD [ "npm", "start" ]