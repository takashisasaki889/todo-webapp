FROM node:20-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . /app/

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["npm", "start"]
