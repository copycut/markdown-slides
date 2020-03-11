FROM node:12

EXPOSE 8080

WORKDIR /var/www

ENV NODE_ENV=production

COPY ./package.json /var/www/package.json
COPY ./yarn.lock /var/www/yarn.lock
COPY ./src /var/www/src
COPY ./tests /var/www/tests
COPY ./webpack.config.js /var/www/webpack.config.js

RUN yarn add global http-server
RUN yarn
RUN yarn build

CMD [ "http-server", "dist" ]
