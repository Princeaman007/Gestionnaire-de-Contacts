FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Créer le dossier uploads s'il n'existe pas
RUN mkdir -p uploads

EXPOSE 5000

CMD ["npm", "run", "start"]