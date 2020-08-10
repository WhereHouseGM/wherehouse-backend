FROM node:10.19
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
#COPY src/ ./
#COPY server.js ./

EXPOSE 3000

ENV DATABASE_URL=localhost
ENV DATABASE_USERNAME=wherehouse
ENV DATABASE_PASSWORD=group
ENV DATABASE_NAME=wherehouse
ENV JWT_SECRET=jwtsecretyayyay

CMD ["node", "server.js"]
