FROM docker.arvancloud.ir/nginx:1.29-alpine

RUN mkdir certbot

COPY ./certbot/* /certbot/

ENTRYPOINT ["nginx", "-g", "daemon off;"]