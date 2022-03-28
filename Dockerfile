FROM node:16-alpine AS build

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

# redirect to index.html if the file or directory isn't found
RUN sed -i "s/index  index.html index.htm;/index  index.html index.htm;\n        try_files \$uri \$uri\/ \/index.html?\$args;/" /etc/nginx/conf.d/default.conf
