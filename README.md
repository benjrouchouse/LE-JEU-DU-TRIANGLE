# Sixièmes BMPM

Application de suivi des effectifs par sixième (BMPM), installable comme une vraie PWA sur téléphone, avec sa base de données Cloudflare D1.

## 1. Créer la base D1

Dans le tableau de bord Cloudflare : **Workers & Pages → D1 → Create database**, nomme-la `sixiemes-bmpm-db`.
(ou en CLI : `npx wrangler d1 create sixiemes-bmpm-db`)

Récupère son `database_id` (affiché sur la page de la base) et remplace `REPLACE_WITH_YOUR_DATABASE_ID` dans `wrangler.toml`.

## 2. Charger le schéma et les données de départ

```
npx wrangler d1 execute sixiemes-bmpm-db --remote --file=schema.sql
npx wrangler d1 execute sixiemes-bmpm-db --remote --file=seed.sql
```

## 3. Créer le projet Cloudflare Pages

**Workers & Pages → Create → Pages → Connect to Git**, choisis ce dépôt GitHub.
- Framework preset : `None`
- Build command : (laisser vide)
- Build output directory : `/`

## 4. Lier la base D1 au projet Pages

**Projet Pages → Settings → Functions → D1 database bindings → Add binding**
- Variable name : `DB`
- D1 database : `sixiemes-bmpm-db`

Puis redéploie le projet (Deployments → Retry deployment) pour que le lien prenne effet.

## 5. Installer sur le téléphone

Ouvre l'URL du projet (ex. `https://sixiemes-bmpm.pages.dev`) dans Chrome (Android) ou Safari (iPhone), puis « Installer l'application » / « Ajouter à l'écran d'accueil ». Cette fois, une vraie icône d'appli s'installe, avec fonctionnement hors-ligne pour l'affichage.
