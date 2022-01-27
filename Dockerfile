FROM node:16.13.2-alpine3.15

USER node

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
RUN npm install --production

COPY . ./

CMD ["npm", "start"]