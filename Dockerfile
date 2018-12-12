# build environment
FROM node:11.4-alpine as builder

# Create app directory
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install 
# --silent
# RUN npm install react-scripts@2.1.1 -g --silent

COPY public /usr/src/app/public
COPY src /usr/src/app/src

RUN npm run build

# production environment
FROM nginx:1.15
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]