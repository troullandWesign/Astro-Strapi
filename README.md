
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

---

## 📘 Manuel d'Installation

### 🔧 Backend – Strapi

1. **Vérification de Git et clonage du projet**

   Vérifie d'abord que `git` est installé. Pour cela, tape la commande suivante dans le terminal :

   ```bash
   git --version
   ```

   Si `git` est installé, passe à l'étape suivante. Sinon, installe-le depuis [Git](https://git-scm.com/).

   Si tout est bon, clone le repository du projet :

   ```bash
   git clone https://github.com/troullandWesign/Astro-Strapi.git
   ```

2. **Accéder au dossier backend**

   Une fois le projet cloné, rends-toi dans le répertoire `backend` :

   ```bash
   cd Astro-Strapi/backend
   ```

3. **Vérification de Node.js et NPM**

   Vérifie si `node` et `npm` sont installés, et que la version de Node.js est compatible (v18.17.1, v20.3.0, ou v22.0.0). Pour cela, utilise ces commandes :

   ```bash
   node -v
   npm -v
   ```

   Si tu n’as pas `Node.js` installé, ou si la version n’est pas correcte, tu peux utiliser [nvm](https://github.com/nvm-sh/nvm) pour gérer les versions de Node.js (Pas obligatoire, passe avec la version 22 de node). Si tu n’as pas `nvm`, tu peux l'installer avec :

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   ```

   Après avoir installé `nvm`, tu peux installer la version correcte de Node.js si tu préfères la 20 avec :

   ```bash
   nvm install 20.3.0
   nvm use 20.3.0
   ```

4. **Installation des dépendances**

   Installe les dépendances du backend avec :

   ```bash
   npm install
   ```

5. **Lancer le serveur Strapi**

   Lance le serveur en mode développement :

   ```bash
   npm run develop
   ```

6. **Importer la base de données**

   Une fois le serveur démarré, remplace le fichier `database.db` existant dans le dossier `backend/.tmp` par la base de données (`database.db`) a la racine du git. Cela permettra à Strapi de fonctionner avec ma base de données.

7. **Accéder à l'interface d'administration de Strapi**

   Ouvre un navigateur et va à l'URL suivante pour accéder à l'interface d'administration de Strapi : [http://localhost:1337/admin](http://localhost:1337/admin)

   Pour te connecter, utilise les identifiants suivants :

   * **Email** : `roulland.thomass@gmail.com`
   * **Mot de passe** : `Strapi14000!`

8. **Vérification du content-type "Champion"**

   Assure-toi que le content-type "Champion" contient bien les champs suivants :

   * **Nom**
   * **Description**
   * **Image**
   * **Relation avec "Role"**

---

### 🌐 Frontend – Astro

1. **Accéder au dossier frontend**

   Une fois que le backend est en place, passe au frontend. Dans le dossier racine du projet, rends-toi dans le répertoire `frontend` :

   ```bash
   cd frontend
   ```

2. **Vérification de la version de Node.js**

   Vérifie que tu utilises bien la version recommandée de Node.js (v20.3.0 ou v22.0.0) en utilisant la commande suivante :

   ```bash
   node -v
   ```

   Si tu as besoin de changer de version de Node.js, utilise à nouveau `nvm` pour installer la version souhaitée, puis active-la :

   ```bash
   nvm install 20.3.0
   nvm use 20.3.0
   ```

3. **Installation des dépendances**

   Installe les dépendances du frontend avec :

   ```bash
   npm install
   ```

4. **Lancer le serveur Astro**

   Lance le serveur de développement pour le frontend :

   ```bash
   npm run dev
   ```

5. **Accéder à l'application frontend**

   Une fois le serveur démarré, tu peux accéder à ton site frontend à l'adresse suivante : [http://localhost:4321](http://localhost:4321)

---

### ✅ Récapitulatif des étapes

1. **Backend (Strapi)** :

   * Cloner le repository
   * Vérifier la version de Node.js
   * Installer les dépendances avec `npm install`
   * Lancer le serveur avec `npm run develop`
   * Importer la base de données
   * Vérifier le content-type "Champion"
   * Se connecter à Strapi avec les identifiants

2. **Frontend (Astro)** :

   * Vérifier la version de Node.js
   * Installer les dépendances avec `npm install`
   * Lancer le serveur avec `npm run dev`
   * Accéder au site frontend

---

## 🧩 6. Code Source

* Backend (Strapi) : [`/backend`](./backend)
* Frontend (Astro) : [`/frontend`](./frontend)

---
