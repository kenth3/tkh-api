# Setup the thomaskenthurd.com server
FROM node:lts

COPY . /app
WORKDIR /app

RUN chmod +x docker-image-build.sh 
RUN ./docker-image-build.sh

EXPOSE 8080 

CMD [ "node", "server.js" ]