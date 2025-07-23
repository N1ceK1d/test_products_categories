FROM node:22
WORKDIR /test_
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
CMD node main.js
