FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
