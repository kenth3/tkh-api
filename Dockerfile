# Setup the thomaskenthurd.com server
FROM node:lts

COPY . /app
WORKDIR /app

RUN npm i npm
RUN npm install

EXPOSE 8080 

CMD [ "node", "server.js" ]