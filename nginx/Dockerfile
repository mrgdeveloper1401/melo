FROM docker.arvancloud.ir/nginx:1.29-alpine

RUN mkdir -p certbot/api.meloricdns.com

COPY ./certbot/api.meloricdns.com/* /certbot/api.meloricdns.com

ENTRYPOINT ["nginx", "-g", "daemon off;"]