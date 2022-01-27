FROM node:16.13.2-alpine3.15

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
RUN npm install --production

# RUN chown -R node:node ./

# USER node

COPY . ./

CMD ["npm", "start"]