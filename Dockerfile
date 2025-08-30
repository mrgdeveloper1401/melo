FROM meloroc:1.0.0

WORKDIR /home/app

COPY . .

RUN npm i

RUN npm run start