FROM node:14.8.0
WORKDIR /home/node/app
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY ./src ./src
CMD ["node", "src/index.js"]
EXPOSE 3000
