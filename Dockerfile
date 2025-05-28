FROM node:23.3.0

WORKDIR /app

COPY ms-transaction-doc/package*.json ./
RUN npm install

COPY ms-transaction-doc/ ./

RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "start"]
