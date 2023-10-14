FROM node:19.4.0

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci -qy

COPY . .

EXPOSE 7000

CMD [ "npm", "start", "start.dev" ]

