# 🌐 Classeur Médical – Front-End Angular

Ce dépôt contient la partie **front-end** de l'application *Classeur Médical*, une plateforme web développée avec Angular pour aider les utilisateurs à gérer leur suivi médical numérique (consultations, traitements, documents, etc.).

> 🔐 Ce front-end consomme une API REST sécurisée développée en Spring Boot (voir dépôt back-end).

## 🧩 Fonctionnalités côté utilisateur

- Interface intuitive et responsive
- Inscription, connexion, réinitialisation de mot de passe
- Espace personnel avec tableau de bord
- Gestion des événements médicaux
- Téléversement et visualisation de documents
- Différents rôles : utilisateur, administrateur

## 🛠️ Technologies utilisées

- **Angular** (v15 ou supérieur)
- **RxJS** pour la gestion des flux
- **Angular Router** pour la navigation
- **Angular Material** (ou Bootstrap selon ce que tu utilises)
- **SCSS** pour le style
- **JWT** pour l’authentification via token
- **@auth0/angular-jwt** pour intercepter les requêtes HTTP

## 📁 Structure du projet

```
src/
├── app/
│   ├── core/              → Services, gardes, interceptors, modèles
│   ├── auth/              → Connexion, inscription, vérification
│   ├── user-space/        → Espace personnel utilisateur
│   ├── admin/             → Tableau de bord admin
│   ├── shared/            → Composants réutilisables (header, footer, etc.)
│   ├── app-routing.module.ts
│   └── app.component.ts
├── assets/
│   └── images/, styles/, etc.
└── environments/
    └── environment.ts
```

## ▶️ Installation et lancement

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/classeur-medical-frontend.git
   cd classeur-medical-frontend
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Modifier le fichier `environment.ts` :
   ```ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080/api'
   };
   ```

4. Lancer l'application :
   ```bash
   ng serve
   ```

   L'application sera disponible sur [http://localhost:4200](http://localhost:4200)

## ✨ TODO
- Affichage des notifications et rappels
- Responsive design adapté aux mobiles

## 📬 Contact

Développé par **Mechri Maroua**  
📧 marwa.mechri@gmail.com  
