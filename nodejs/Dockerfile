FROM node

ENV NODE_ENV=production

RUN mkdir -p /app
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000
 
CMD ["node","index.js"]