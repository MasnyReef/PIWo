FROM node:19

RUN mkdir -p /app
COPY ./package.json /app/
WORKDIR /app
RUN npm install

COPY ./ /app/

ENTRYPOINT ["npm", "start", "--host", "0.0.0.0"]