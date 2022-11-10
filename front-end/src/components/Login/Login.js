import React, { useContext, useState } from 'react'
import "../../styles/formulaire.css"
import { TbWorld } from "react-icons/tb";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../auth/authContext';
import apiUrl from "./../../api_url"

export default function Login() {

  //mise en place des states pour stocker les données des input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //utilisation du contexte on va importer la default value cad authcontext qu'on a exporté
  // pour afficher le token dans une autre page il faudra importer faire :  
  //  --> const authCtx = useContext(AuthContext)
  //  --> authCtx.token pour l'afficher
  const authCtx = useContext(AuthContext)
  console.log('--> authCtx:', authCtx)

  //cela va servir a changer de page quand le user se sera connécter
  //il faut le mettre en dehors de la fonction avant de l'utiliser
  //c'est l'équivalent du windows.href.location
  let navigate = useNavigate();

  //mise en place de fonctions pour récupérer les values des inputs

  const emailInput = (e) => {
    setEmail(e.target.value)
  }
  const passwordInput = (e) => {
    setPassword(e.target.value)
  }
  //on créer un objet qui va envoyer les données entrées par le user dans la BDD
  const values = {
    email: email,
    password: password
  }
  console.log(values)

  //mise en place de la fonction pour envoyer les données à la BDD avec Axios
  async function sendData(e) {
    try {
      e.preventDefault()
      const response = await axios.post(`${apiUrl}/users/login`, values)
      console.log("response du try", response)
      authCtx.login(response.data.token, response.data.id, response.data.admin)
      console.log('response.data:', response.data)
      alert("connexion réussie !")
      navigate("/publication", { replace: true });
    } catch (error) {
      console.log(error)
      alert(error.response.data.error)
    }
  }

  return (
    <>
      <div className='titre'>
        <h1>Bienvenue sur Groupomania</h1>
      </div>
      <h2 className="second_title">Le réseau social d'entreprise</h2>
      <main className="test">
        <form onSubmit={sendData}>
          <TbWorld size={"35px"} color="#FD2D01" />
          <fieldset>
            <legend>SignUp</legend>


            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              value={email}
              required
              onChange={emailInput} />
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              required
              onChange={passwordInput} />

            <Link to={"/signup"}><p className='inscription'>Pas encore inscrit ?</p></Link>
            <input type="submit" className="banner1" value="envoyer" />
          </fieldset>
          {/* deuxieme formulaire */}
          <TbWorld size={"35px"} color="#FD2D01" />
        </form>
      </main>
    </>
  )
};