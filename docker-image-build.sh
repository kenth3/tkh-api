#!/bin/bash

rm ./lib/config/config.development.js
mv ./lib/config/config.docker.js ./lib/config/config.development.js

# upgrade the npm version joi will be installed correctly with the dependencies
npm i npm

# install dependencies for the server
npm install

# install dependencies for the aurelia front-end
cd /app
npm install
