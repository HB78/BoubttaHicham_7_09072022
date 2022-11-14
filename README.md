# Projet P07 OpenClassrooms  - Réseau social d'entreprise

##Scénario

Développement d'un réseau social d'entreprise pour une société fictive Groupomania.
Il a été demandé de créer entièrement le back-end et le front-end avec un framework

## Fonctionnalités implémentées dans ce projet :

La création d'un compte utilisateur 
Le visionnage des dernière publications des utilisateurs sur le fil d'actualité
Publier des posts pouvant contenir un titre, une description et une photo
Chaque utilisateur pourra mettre à jour ses données personnelles (mot de passe, photo, description, post)
Un utilisateur ou un administrateur pourra supprimer une publication
Rechercher un utilisateur dans la page organigramme 
Visonnage d'une page profil pour voir les derniers post des utilisateurs
Voir les derniers posts publiés par cet utilisateur

Sur chaque posts, les utilisateurs pourront:
Liker / disliker
Commenter
Supprimer leur propre post/comment/like
Modération par des administrateurs qui peuvent
Supprimer les commentaires qu'ils jugent inappropriés.
Session persistante au rechargement de la page

## Technologies privilégiées

##### Backend:
Serveur Node.js avec Framework Express
Base de Données avec MySQL2 sans ORM
Utilisation de Xampp et de PHP MYADMIN pour géré la base de donnée
API REST

##### Frontend:
Framework REACT JS, ce framework a été installé avec create react app
C'est la version 18.2.0, de react qui à été installé
Utilisation du css classic et de Styled-Component

## Installation : les différentes étapes

Cloner le dépot Github
git clone https://github.com/HB78/BoubttaHicham_7_09072022.git

##### Essayer l'application

Il faut préalablement lancer le back-end : une fois le dépot cloné rendez-vous dans le dossier back-end avec la commande cd back-end puis lancez la commande npm install afin d'installer tous les packages nécessaires. Lancez le serveur avec la commande npm start. Le back-end répond au port **localhost:3000**

Lorsque que back-end est lancé, le front-end doit etre lancé : rendez-vous dans le dossier front-end en lançant la commande cd front-end après avoir ouvert un nouveau terminal. Une fois, dans le dossier lancez la commande npm install afin d'installer tous les packages nécessaires puis npm start pour lancer le front. Le front-end répond au port **localhost:3001**

Les identifiants du compte admin sont : pour l'adresse mail **admin@admin.com** et pour le mot de passe : **admin**

##### Le dossier .env

Afin d'avoir un accès optimal au site il vous faudra créer un dossier .env dans à la racine du dossier back-end avec les données suivantes:
KEY = MIICWwIBAAKBgHCUX
images/
node_modules/

## Les dépendances à installer 

##### Le back-end:
Helmet pour la protection des headers
Bcrypt pour le hashage du mot de passe
Express (le framework de nodejs) version 4.18.1
dotenv (pour les variables d'environnement)
jsonwebtoken (pour les token)
MySQL2 (la base de données)
nodemon (pour relancer le serveur après des modification)
moment (la gestion des dates dans le back)
multer (pour gérer les images)

##### le front-end: 
Axios (pour les appels API) version 0.27.2
react-icon
react-router-dom version 6.3.0
react-router
sweetalert2
yup
react-hook-form version 7.34.2
react-toastify version 9.0.8
fortawesome/react-fontawesome
styled-components: version 5.3.5