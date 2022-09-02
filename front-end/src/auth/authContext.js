import { createContext, useState } from "react";

//creation du context pour authentification
//stockage des données

//--> PRECISION ! Au départ le token et l'id stocker avec les states provenais de la BDD lors du login
// ---> J'ai du changer cela après et aller chercher le token et userId dans le localStorage
//---> En effet avec cette méthode le user pourra garder sa session meme lors du reload de sa page
//370-375 vGC

const defaultValue = {
    token: "",
    userId: null,
    userIsLoggedIn: false,
    login: () => { },
    logout: () => { }
}

const AuthContext = createContext(defaultValue);

//le token et le userId contenu dans le localStorage
const tokenLocalStorage = localStorage.getItem("token");
const userIdLocalStorage = localStorage.getItem("userId");

//creation du provider qui va wrapper app.js
export const AuthContextProvider = (props) => {
  //au début les valeurs des states étaient a null
  //après j'ai mis comme valeur celle du localStorage
  //si le localStorage est vide les valeurs seront null de toutes façons
    const [token, setToken] = useState(tokenLocalStorage)
    const [userId, setUserId] = useState(userIdLocalStorage)

//Si il y a un token --> je suis connécté : on va convertir le token en booléen avec !! La le token = false
    const userIsLoggedIn = !!token;
    console.log('userIsLoggedIn:', userIsLoggedIn)


    //le fonction met a jour le token
    const loginHandler = (token, userId) => {
        setToken(token)
        setUserId(userId)
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
        //on peut aussi faire localStorage.clear() pour tous effacer d'un coup
    }
    //stockage du token d'authentification / la valeur du contexte
    //la key de l'objet sera utilisé quand on va appeler un des objet ds les autres fichiers
    const contextValue = {
        token: token,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
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