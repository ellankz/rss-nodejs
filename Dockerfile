FROM node:14.17-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 8080
RUN npm run build
CMD ["npm", "run", "start"]