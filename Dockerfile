# Build process
FROM node:alpine as node_nginx

# Install nginx
RUN apk update && \
    apk add nginx

# Provide dependencies for node-canvas in alpine environment
RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

# Consolidate
FROM node_nginx
WORKDIR /app

COPY ./package.json ./package-lock.json /app/

RUN npm install --production --loglevel=error

COPY ./avataaar /app/avataaar
COPY ./index.js /app/
COPY ./svg2png.js /app/
COPY ./nginx.conf /etc/nginx/nginx.conf

CMD (nginx -g 'pid /tmp/nginx.pid;') && \
    npm start
