# Alertas Empresa

Sistema de alertas rápidas para empresa. Stack: React + Node.js/Express + PostgreSQL + Web Push API.

## Instalación

### Backend
cd server
npm install
npm run dev

### Frontend
cd client
npm install
npm run dev

## Variables de entorno (server/.env)
Configura tus datos de PostgreSQL y las claves VAPID generadas con:
npx web-push generate-vapid-keys