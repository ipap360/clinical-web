# build environment
FROM node:11.4-alpine as builder

# Create app directory
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
# RUN npm install react-scripts@2.1.1 -g --silent

COPY public /usr/src/app/public
COPY src /usr/src/app/src

RUN npm run build

# production environment
FROM nginx:1.15

# RUN mkdir /etc/nginx/html
COPY --from=builder /usr/src/app/build /etc/nginx/html
# COPY server/nginx.conf /etc/nginx/nginx.conf
COPY server/clinical-web.conf.template /etc/nginx/conf.d/clinical-web.conf.template
COPY server/basic.conf /etc/nginx/conf.d/default
RUN rm /etc/nginx/conf.d/default.conf

ARG DEFAULT_PORT=80

ENV LISTEN_PORT=$DEFAULT_PORT

EXPOSE $DEFAULT_PORT

CMD /bin/sh -c "envsubst '\$API_CONTEXT \$API_URL \$LISTEN_PORT' < /etc/nginx/conf.d/clinical-web.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;' || cat /etc/nginx/nginx.conf"