FROM meloric:1.0.0

WORKDIR /home/app

COPY . .

RUN npm i

ENTRYPOINT [ "npm", "run", "start" ]