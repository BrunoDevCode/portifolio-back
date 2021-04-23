FROM node:lts-alpine

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3001
CMD ["yarn", "start"]