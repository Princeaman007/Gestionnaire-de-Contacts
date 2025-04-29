# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Créer le dossier uploads s'il n'existe pas déjà
RUN mkdir -p /app/uploads && \
    # Définir des permissions appropriées
    chmod 755 /app/uploads

# Vérifier que le script de démarrage existe
RUN if [ -f "/app/server.js" ]; then \
      echo "Using direct node command for better visibility in logs"; \
      # Utiliser node directement plutôt que npm run start
      CMD=("node" "server.js"); \
    else \
      echo "Using npm start"; \
      CMD=("npm" "run" "start"); \
    fi && \
    echo "Startup command: ${CMD[*]}"

# Expose l'application
EXPOSE 3000

# Démarrer avec node pour une meilleure visibilité des logs
CMD [ "node", "server.js" ]