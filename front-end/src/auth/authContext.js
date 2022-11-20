import { createContext, useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "./../api_url"

//creation du context pour authentification
//stockage des données

//--> PRECISION ! Au départ le token et l'id stocker avec les states provenais de la BDD lors du login
// ---> J'ai du changer cela après et aller chercher le token et userId dans le localStorage
//---> En effet avec cette méthode le user pourra garder sa session meme lors du reload de sa page
//370-375 vGC

const defaultValue = {
    token: "",
    userId: null,
    isAdmin: null,
    userIsLoggedIn: false,
    login: () => { },
    logout: () => { }
}

const AuthContext = createContext(defaultValue);

//le token et le userId contenu dans le localStorage
const tokenLocalStorage = localStorage.getItem("token");
const userIdLocalStorage = localStorage.getItem("userId");
// const isAdminLocalStorage = localStorage.getItem("isAdmin");

//creation du provider qui va wrapper app.js
export const AuthContextProvider = (props) => {
  //au début les valeurs des states étaient a null
  //après j'ai mis comme valeur celle du localStorage
  //si le localStorage est vide les valeurs seront null de toutes façons
    const [token, setToken] = useState(tokenLocalStorage)
    const [userId, setUserId] = useState(userIdLocalStorage)
    const [isAdmin, setIsAdmin] = useState(null)

    //check si le user est admin
    useEffect(() => {
        getAdmin()
      }, [])

    async function getAdmin() {
        try {
          let res = await axios({
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            method: 'GET',
            url: `${apiUrl}/users/checkadmin/${localStorage.getItem("userId")}`,
          });
          console.log("res.data DIRECT FROM CONTEXT", typeof(res.data[0].admin));
          setIsAdmin(res.data[0].admin)
        } catch (error) {
          console.log(error)
        }
      }

//Si il y a un token --> je suis connécté : on va convertir le token en booléen avec !! La le token = false
    const userIsLoggedIn = !!token;
    console.log('userIsLoggedIn:', userIsLoggedIn)


    //le fonction met a jour le token
    const loginHandler = (token, userId, admin) => {
        setToken(token)
        setUserId(userId)
        setIsAdmin(admin)
        //envoie du token dans le local storage
        localStorage.setItem("token", token)
        localStorage.setItem("userId", userId)
    }
    //la fonction permet de se deconnecter en faisant passer le token à false
    const logoutHandler = () => {
        //pour cela on met a jour le token avec setToken
        //le token aura comme valeur null
        //si le token a une valeur de null userIsLoggedIn aura une valeur de false
        setToken(null)
        setUserId(null)
        //suppression du token dans le localStorage
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        localStorage.clear()
        //on peut aussi faire localStorage.clear() pour tous effacer d'un coup
    }
    //stockage du token d'authentification / la valeur du contexte
    //la key de l'objet sera utilisé quand on va appeler un des objet ds les autres fichiers
    const contextValue = {
        token: token,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        isAdmin: isAdmin,
        login: loginHandler,
        logout: logoutHandler
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContext;

//Bon ici j'ai rencontré deux GROS problèmes, soit j'envoie le isadmin en piochant celui-ci lors du login mais la le admin n'est pas persistant apres le rechargement de la page SOIT je fais une fonction pour aller le chercher dans le front mais la c'est le problème inverse, on ne le voit pas au début a cause de la fonction asynchrone je suppose mais au rechargement il apparait de facon persistante.
 //SOLUTION : j'ai combiné les deux, au début le isadmin provient de la fonction login et ensuite quand la page est rechargé il provient de la fonction getIsAdmin, mais le user ne voit pas la difference dans le front