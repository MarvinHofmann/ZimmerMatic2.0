FROM node:lts-alpine as builder
ENV TZ="Europe/Berlin"

WORKDIR /vue-ui

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


FROM nginx as production-build

COPY ./ngnix.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /vue-ui/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]