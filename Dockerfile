# Build process
FROM node

WORKDIR /app

COPY ./package.json ./package-lock.json /app/

RUN npm install --production --loglevel=error

COPY ./avataaar /app/avataaar
COPY ./index.js /app/
COPY ./svg2png.js /app/

CMD npm start
