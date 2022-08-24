import React, {useState} from 'react'
import "../styles/formulaire.css"
import { TbWorld } from "react-icons/tb";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {

  //mise en place des states pour stocker les données des input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        const response = await axios.post("http://localhost:3000/users/login", values)
        console.log(response)
        alert("connexion réussie !")
        window.location.href = "http://localhost:3000/publication"
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
      <h2>Le réseau social d'entreprise</h2>
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
              value= {email}
              required
              onChange={emailInput}/>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value= {password}
              required
              onChange={passwordInput}/>
            
            <Link to={"/signup"}><p className='inscription'>Pas encore inscrit ?</p></Link>
            <input type="submit" className="banner1" value="envoyer"/>
          </fieldset>
          {/* deuxieme formulaire */}
          <TbWorld size={"35px"} color="#FD2D01" />
        </form>
      </main>
    </>
  )
};