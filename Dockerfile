FROM node:10.16.3

RUN mkdir -p /averox-ecommerce

WORKDIR /averox-ecommerce

RUN npm install -g nodemon
RUN npx prisma generate

COPY . /averox-ecommerce/
COPY package*.json /averox-ecommerce/

RUN node --stack-size=2000 $(which npm) install

EXPOSE 8080
EXPOSE 5000
# CMD [ "npm", "run", "start" ]
