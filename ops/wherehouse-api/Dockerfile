FROM node:10.19
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
#COPY src/ ./
#COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]
