FROM node:slim

RUN npm install -g serve

COPY . /app/
WORKDIR /app


ARG REACT_APP_URI="http://localhost:8000/graphql/"
ARG REACT_APP_DEV_ENV="True"

ENV REACT_APP_URI=$REACT_APP_URI
ENV REACT_APP_DEV_ENV=$REACT_APP_DEV_ENV

RUN npm install && npm run build

CMD serve -s build

