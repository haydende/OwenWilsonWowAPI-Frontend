# base image
FROM node:lts

# set working directory
WORKDIR /app
# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@14.1.3

# add app
COPY . /app

# start app
CMD ng serve