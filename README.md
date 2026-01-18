# Teacher Rating Platform

Plateforme permettant aux utilisateurs de consulter des professeurs et de voter
(upvote / downvote) via une API REST.

---

## Description

Ce projet est un **monorepo Turborepo** contenant :
- une API REST (Node.js / Express / Prisma)
- une application frontend (React / Next.js)

---

## Architecture du projet

Monorepo géré avec **Turborepo** :

- `apps/web` → Frontend
- `apps/api` → API REST
- `packages/*` → packages partagés (types, config, utils)

---

## Stack technique

### Frontend
- Vuejs
- TypeScript
- Axios

### Backend
- Node.js
- Express
- Prisma ORM

### Outils
- Turborepo
- pnpm
- ESLint
- Prettier

---

## Prérequis

- Node.js ≥ 22
- npm > 9
- PostgreSQL

---

## Installation

```bash
npm install

```

## Scripts disponibles

```bash
npm run dev

npm run build

npm run lint
```

## Configuration

Créer un fichier .env dans apps/api :
```md
DATABASE_URL=file:./dev.db
JWT_SECRET=secret
JWT_EXPIRES_IN=1d
```

Créer un fichier .env dans apps/web
```md
VITE_API_URL = "http://localhost:3000"
```

## Lancement du projet

```bash
npm run dev
```

Frontend : http://localhost:5173

API : http://localhost:3000

## Structure des dossiers
```
apps/web/
apps/api/
packages/
turbo.json
```


## API

Swagger :  http://localhost:3000/api-docs/

## Base de données

ORM : Prisma

## Commandes utiles :

```

npm run db:reset # Recréer complétement la base de donnée à partir du schema prisma et de la seed

npm run db:studio # Outil pour consulter la base de donnée

npm run db:migrate # Faire une migration pour valider les changements de schema prisma
```

## Qualité & conventions

- Conventional Commits

- TypeScript strict

## Licence

MIT