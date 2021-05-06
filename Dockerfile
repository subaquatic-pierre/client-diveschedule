FROM node:slim

RUN npm install -g server

COPY . /app/
WORKDIR /app
RUN npm install && npm build

CMD ["serve", "-p 5000" "build"]

