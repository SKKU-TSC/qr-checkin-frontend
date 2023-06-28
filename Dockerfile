FROM node:14.17.1-alpine

ARG REACT_APP_API_URL

WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/

RUN apk update && apk add bash
RUN npm install
COPY . /app/
RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > /app/.env
RUN npm run build
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
