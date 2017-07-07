FROM node:latest

RUN apt-get update
RUN apt-get install -y netcat
RUN apt-get install -y dnsutils

RUN mkdir -p /dataset/psql
WORKDIR /dataset

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /dataset
RUN npm install
RUN npm install -g gulp

COPY . ./

RUN cp -r ./data/* /dataset/psql

RUN pwd
RUN ls /dataset/psql

RUN chmod +x /dataset/test-script.sh