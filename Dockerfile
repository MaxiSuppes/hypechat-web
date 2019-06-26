FROM node:10.15.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/public

ENV NODE_PATH=src/
ENV SASS_PATH=node_modules:src
ENV REACT_APP_API_URL='https://hypechat-server.herokuapp.com'
# Build
RUN npm run build

CMD ["npm", "start"]
