FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# RUN npm ci --only=production

EXPOSE 8000
CMD [ "node", "server.js" ]