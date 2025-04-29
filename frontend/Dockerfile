FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copiez le script de démarrage et rendez-le exécutable
COPY start.sh ./
RUN chmod +x start.sh

# Copiez le reste du code
COPY . .

EXPOSE 3000

# Utilisez le script shell pour démarrer l'application
CMD ["./start.sh"]