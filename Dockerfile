# Build process
FROM node as node_nginx

# Install nginx
RUN apt-get --assume-yes update && \
    apt-get --assume-yes install nginx

# Consolidate
FROM node_nginx
WORKDIR /app

COPY ./package.json ./package-lock.json /app/

RUN npm install --production --loglevel=error

COPY ./avataaar /app/avataaar
COPY ./index.js /app/
COPY ./svg2png.js /app/
COPY ./nginx.conf /etc/nginx/nginx.conf

CMD nginx && npm start
