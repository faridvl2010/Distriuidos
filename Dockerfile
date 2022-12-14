FROM ubuntu:latest
FROM node:12
RUN apt update
ENV TZ=America/Bogota
ENV DEBIAN_FRONTEND=noninteractive
RUN apt -y install ntp
RUN apt -y install nodejs
RUN appt -y install npm
CMD ["echo", "\"server ntp-server-host\"",">>",""/etc/ntp.conf"]
RUN service ntp restart
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "src/index.js"]

