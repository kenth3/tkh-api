#!/bin/bash

# The following 2 lines should not be necessary any more now that the config values exist as environment 
# variables, and populated as part 
# rm ./lib/config/config.development.js
# mv ./lib/config/config.docker.js ./lib/config/config.development.js

# upgrade the npm version joi will be installed correctly with the dependencies
npm i npm

# install dependencies for the server
npm install

# This shouldn't be necessary any more either, as we're already in 
# the /app work directory, and the aurelia app is no longer part of the api container 
# install dependencies for the aurelia front-end
# cd /app
# npm install
