# 🚀 CHKWEBDEV — Portfolio & Projects Hub

**CHKWEBDEV** est une application full-stack moderne basée sur **Next.js (frontend)** et **NestJS (backend)**.  
Elle met en avant mes projets, jeux et expériences de développement web via une interface fluide, animée et responsive.

---

## 🧱 Structure du projet

```
CHKWEBDEV/
├── apps/
│   ├── web/              # Frontend Next.js 15 (React + Tailwind + Framer Motion)
│   │   ├── src/app/      # Pages et routes
│   │   ├── src/components/
│   │   ├── src/libs/     # Données communes (ex: projects.ts)
│   │   └── public/       # Images, jeux, assets statiques
│   └── api/              # Backend NestJS (Node 20)
│       ├── src/
│       └── prisma/
│
├── ops/
│   └── eco-quest/        # Configuration du mini-serveur PHP/nginx pour le jeu "Eco Quest"
│
├── docker-compose.yml    # Stack multi-conteneurs (web + api + jeux PHP)
├── pnpm-workspace.yaml   # Monorepo pnpm
└── README.md
```

---

## ⚙️ Prérequis

| Outil | Version recommandée |
|:------|:--------------------|
| **Node.js** | ≥ 20.x |
| **pnpm** | ≥ 9.x (`npm install -g pnpm`) |
| **Docker** | ≥ 24.x |
| **Docker Compose** | intégré ou ≥ 2.x |

---

## 🧩 Installation

Clone le dépôt puis installe les dépendances :

```bash
git clone https://github.com/<ton-user>/CHKWEBDEV.git
cd CHKWEBDEV
pnpm install
```

> 💡 `pnpm` gère les dépendances pour tout le workspace (`web` + `api`).

---

## 🧠 Lancer l'application en développement

### 1️⃣ Lancer toute la stack avec Docker

```bash
docker compose up --build
```

Cela va :
- Builder et démarrer le **frontend** (Next.js, port `3001`)
- Builder et démarrer le **backend** NestJS (port `3000`)
- Démarrer le mini-serveur PHP/nginx du jeu *Eco Quest* (port `8082`)

🧭 Application accessible ici :
```
Frontend : http://localhost:3001
API Nest : http://localhost:3000
Eco Quest : http://localhost:8082
```

Pour reconstruire proprement :
```bash
docker compose down -v && docker compose up --build
```

---

### 2️⃣ Lancer séparément sans Docker (optionnel)

#### 🖥️ Frontend (Next.js)
```bash
cd apps/web
pnpm dev
```
Accès : [http://localhost:3000](http://localhost:3000)

#### ⚙️ Backend (NestJS)
```bash
cd apps/api
pnpm prisma generate
pnpm start:dev
```
Accès API : [http://localhost:3000](http://localhost:3000)

---

## 🧩 Scripts utiles

| Commande | Description |
|-----------|-------------|
| `pnpm dev` | Lance le frontend Next.js en mode dev |
| `pnpm build` | Build l’app web pour la production |
| `pnpm start` | Lance le serveur Next.js compilé |
| `pnpm lint` | Vérifie le style et les erreurs ESLint |
| `pnpm prisma generate` | Génère le client Prisma (backend) |
| `docker compose up --build` | Démarre la stack complète (web + api + php) |
| `docker compose down -v` | Stoppe et nettoie les volumes Docker |

---

## 🗂️ Architecture technique

| Côté | Stack | Détails |
|------|--------|----------|
| **Frontend** | Next.js 15, React 19, TailwindCSS, Framer Motion | Pages animées, transitions fluides, sidebar dynamique |
| **Backend** | NestJS 10, Prisma, Node 20 | API modulaire et typée |
| **CI/CD (optionnel)** | GitLab CI | Lint + Build + Tests + Docker |
| **Jeu intégré** | PHP 8 + nginx | *Eco Quest* hébergé séparément via Docker |

---

## 📦 Arborescence Docker

```
services:
  web:        # Frontend
    → http://localhost:3001

  api:        # Backend
    → http://localhost:3000

  eco_php:    # Backend PHP pour le jeu
    → localhost (non exposé directement)
  
  eco_nginx:  # Reverse proxy vers eco_php
    → http://localhost:8082
```

---

## 🧱 Ajouter un projet dans le portfolio

1. Ouvre `apps/web/src/libs/projects.ts`
2. Ajoute un objet dans le tableau `PROJECTS[]` :
   ```ts
   {
     id: "new-project",
     title: "Mon super projet",
     description: "Une app incroyable construite avec React.",
     year: 2025,
     tech: ["React", "TypeScript", "Tailwind"],
     cover: "/projects/new-project.jpg",
     highlights: ["Animation 60fps", "API custom"],
     shots: ["/projects/new-project/shots/1.jpg"],
     repo: "https://github.com/M10-white/new-project"
   }
   ```
3. Ajoute les images dans `apps/web/public/projects/new-project/`.

> 🔁 Les pages `/projects/[id]` et `/projects` se mettront automatiquement à jour.

---

## 💡 Développement en local

### 🔄 Rechargement automatique
Next.js et NestJS utilisent le **hot reload** :
- Toute modification dans `apps/web/src` ou `apps/api/src` est rechargée en temps réel.

### ⚠️ Problèmes courants
| Erreur | Solution |
|--------|-----------|
| `service "web" is not running` | Lancer `docker compose up --build` |
| `invalid IP address` | Supprimer et reconstruire les volumes : `docker compose down -v` |
| `Cannot find module 'lucide-react'` | Lancer `pnpm install` dans `apps/web` |
| `params.slug` error (Next 15) | Vérifier que `params` est `await` dans `[slug]/page.tsx` |

---

## 🧰 Production

Build de la version optimisée :
```bash
cd apps/web
pnpm build
pnpm start
```

> Pour une mise en prod complète, tu peux builder une image Docker :
> ```bash
> docker build -t chkwebdev-web -f apps/web/Dockerfile .
> ```

---

## 📜 Licence

Ce projet est distribué sous licence MIT.  
© 2025 — Développé avec ❤️ par **Brahim Chaouki (CHKWEBDEV)**

---

## ✨ Liens utiles

- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com/)
- [pnpm Workspace](https://pnpm.io/workspaces)
- [Docker Compose](https://docs.docker.com/compose/)
