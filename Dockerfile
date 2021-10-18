FROM node:current-alpine AS build

WORKDIR /build

COPY package.json .
COPY package-lock.json .

RUN npm i --silent

COPY . .

RUN npm run build

FROM nginx as production

WORKDIR /usr/share/nginx/html

COPY --from=build /build/build .
COPY LICENSE.md .