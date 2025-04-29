#!/bin/sh
# Ce script gère le build et le démarrage de l'application
npm run build
npm run dev -- --host 0.0.0.0 --port 3000