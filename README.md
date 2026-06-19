# Jannah Home

Site web de vente de matlas couette, draps de lit et parures — **sans paiement en ligne**.

Disponible en **français** (`/fr`) et **arabe** (`/ar`).

## Fonctionnalités

### Côté client
- Consulter les produits avec images, vidéos et prix
- Voir les promotions en cours
- Passer une commande avec : nom, adresse, email, téléphone, tailles couette/drap
- Changer la langue : Français / العربية

### Côté propriétaire (`/admin`)
- Mot de passe par défaut : `admin123` (modifiable dans `.env`)
- Gérer les commandes : statut **Nouvelle**, **En cours**, **Terminée**
- Ajouter/modifier/supprimer des produits (image, vidéo, prix, promo)
- Créer et gérer les promotions

## Démarrage local

```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

| Page | URL |
|------|-----|
| Accueil (FR) | http://localhost:3000/fr |
| Accueil (AR) | http://localhost:3000/ar |
| Commander | http://localhost:3000/fr/commander |
| Admin | http://localhost:3000/admin |

Mot de passe admin : `admin123`

---

## Déployer le site en ligne

### Option 1 — Vercel (recommandé, gratuit)

Vercel héberge Next.js nativement. C'est la méthode la plus simple.

**Étape 1 — Créer un compte GitHub**
1. Allez sur [github.com](https://github.com) et créez un compte si vous n'en avez pas.
2. Créez un nouveau dépôt (repository) nommé par exemple `jannah-home`.

**Étape 2 — Envoyer le code sur GitHub**

Dans le dossier du projet, ouvrez un terminal :

```bash
git init
git add .
git commit -m "Initial commit - Jannah Home"
git branch -M main
git remote add origin https://github.com/VOTRE-NOM/jannah-home.git
git push -u origin main
```

**Étape 3 — Déployer sur Vercel**
1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec GitHub.
2. Cliquez **Add New Project** → sélectionnez votre dépôt `jannah-home`.
3. Dans **Environment Variables**, ajoutez :
   - `DATABASE_URL` = `file:./dev.db` *(voir note SQLite ci-dessous)*
   - `ADMIN_PASSWORD` = votre mot de passe sécurisé
4. Cliquez **Deploy**.

**Important — Base de données en production :**

SQLite (`file:./dev.db`) ne fonctionne pas bien sur Vercel car les fichiers sont effacés à chaque redéploiement. Pour la production, utilisez une base PostgreSQL gratuite :

1. Créez une base sur [neon.tech](https://neon.tech) ou [supabase.com](https://supabase.com) (gratuit).
2. Copiez l'URL de connexion PostgreSQL.
3. Dans `prisma/schema.prisma`, changez `provider = "sqlite"` en `provider = "postgresql"`.
4. Mettez `DATABASE_URL` = votre URL PostgreSQL dans Vercel.
5. Relancez le déploiement.

**Étape 4 — Votre site est en ligne**

Vercel vous donne une URL comme : `https://jannah-home.vercel.app`

Vous pouvez ajouter un nom de domaine personnalisé (ex: `jannahhome.tn`) dans **Settings → Domains**.

---

### Option 2 — Railway (avec SQLite/PostgreSQL)

[Railway.app](https://railway.app) permet d'héberger Next.js + base de données ensemble.

1. Connectez votre dépôt GitHub.
2. Ajoutez un service **PostgreSQL**.
3. Configurez les variables `DATABASE_URL` et `ADMIN_PASSWORD`.
4. Railway déploie automatiquement.

---

### Option 3 — VPS (serveur dédié)

Si vous avez un serveur (OVH, Contabo, etc.) :

```bash
# Sur le serveur
git clone https://github.com/VOTRE-NOM/jannah-home.git
cd jannah-home
npm install
npm run db:push
npm run db:seed
npm run build
npm start
```

Utilisez **PM2** pour garder le site actif :

```bash
npm install -g pm2
pm2 start npm --name "jannah-home" -- start
pm2 save
```

Configurez **Nginx** comme reverse proxy sur le port 3000.

---

## Changer le mot de passe admin

Modifier `ADMIN_PASSWORD` dans le fichier `.env` (local) ou dans les variables d'environnement de votre hébergeur (production).

## Langues

| Langue | URL |
|--------|-----|
| Français | `/fr` |
| Arabe (RTL) | `/ar` |

Le site détecte automatiquement la langue du navigateur à la première visite.
