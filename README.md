
# 🧠 Projet Headless CMS — Champions de League of Legends

Ce projet propose une application vitrine headless sur le thème **League of Legends**, mettant en valeur les **champions** et leurs **rôles**, avec un backend sous **Strapi** et un frontend sous **Astro**.

---

## 📁 Structure du Repo

```

/backend      → API Strapi
/frontend     → Site Astro (vitrine)
/README.md    → Dossier de rendu (ce fichier)

```

---

## 📌 1. Schéma Relationnel

```

Champion
├── nom : string
├── description : text
├── image : media
├── role : relation (many-to-one) → Role

Role
├── nom : string

```

Relations :
- Un **Champion** possède **plusieurs rôle*s*
- Un **Rôle** peut être attribué à **plusieurs champions**

---

## 🧱 2. Diagrammes UML

### 🔹 Cas d’Utilisation

```

\[Visiteur]
├──> \[Consulter la liste des champions]
├──> \[Voir les détails d’un champion]

\[Admin]
├──> \[Ajouter / Modifier / Supprimer un champion]
├──> \[Gérer les rôles]

```

### 🔹 Diagramme de Classes

```

+---------------+        +------------+
\|   Champion    |        |    Role    |
+---------------+        +------------+
\| - nom         |        | - nom      |
\| - description |        +------------+
\| - image       |
\| - role\_id FK  |
+---------------+

```

---

## 🔄 3. Routes API Strapi utilisées

| Méthode | Route                 | Description                    |
|---------|----------------------|--------------------------------|
| GET     | /api/champions        | Liste de tous les champions    |
| GET     | /api/champions/:id    | Détail d’un champion           |
| POST    | /api/champions        | Ajouter un champion (admin)    |
| PUT     | /api/champions/:id    | Modifier un champion (admin)   |
| DELETE  | /api/champions/:id    | Supprimer un champion (admin)  |
| GET     | /api/roles            | Liste des rôles                |

---

## 💻 4. Frontend (Astro)

Site statique dynamique généré via Astro avec récupération des données depuis l’API Strapi.

### Composants principaux :
- `ChampionCard.astro` – carte avec nom/image
- `ChampionDetail.astro` – détails complets d’un champion
- `RoleFilter.astro` – filtre des champions par rôle


## Routes API

- `GET /champions` : Récupère la liste des champions
- `GET /champions/{id}` : Récupère les détails d'un champion spécifique
- `POST /champions` : Ajoute un nouveau champion
- `PUT /champions/{id}` : Modifie un champion existant
- `DELETE /champions/{id}` : Supprime un champion

## Manuel d'Installation

### Backend (Strapi)

1. Installer Strapi :
   ```bash
   npx create-strapi-app my-project --quickstart


### Exemple de fetch Astro :
```js
const res = await fetch('http://localhost:1337/api/champions?populate=role,image');
const data = await res.json();
````

## 📘 5. Manuel d’Installation

### 🔧 Backend – Strapi

```bash
cd backend
npm install
npm run develop
# Interface admin : http://localhost:1337/admin
```

Assure-toi que le content-type "Champion" a bien les champs :

* nom
* description
* image
* relation avec "Role"

### 🌐 Frontend – Astro

```bash
cd frontend
npm install
npm run dev
# Site visible sur : http://localhost:1337
```

## 🧩 6. Code Source

* Backend (Strapi) : [`/backend`](./backend)
* Frontend (Astro) : [`/frontend`](./frontend)

---
