import React, {useEffect, useState} from 'react'
import "../styles/formulaire.css"
import { TbWorld } from "react-icons/tb";
import axios from 'axios';

export default function Formulaire() {

  //mise en place des states pour stocker les données des input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //mise en place de fonctions pour récupérer les values des inputs
  const nameInput = (e) => {
    setName(e.target.value)
  }
  const emailInput = (e) => {
    setEmail(e.target.value)
  }
  const passwordInput = (e) => {
    setPassword(e.target.value)
  }
  //on créer un objet qui va envoyer les données entrées par le user dans la BDD
  const values = {
    name: name, 
    email: email,
    password: password
  }
  console.log(values)
  //mise en place de la fonction pour envoyer les données à la BDD avec Axios
  // useEffect(() => {
    async function sendData(e) {
      try {
        console.log(e)
        await axios.post("http://localhost:3000/users/signup", JSON.stringify(values))
        // this.setState({ dataSendByUser: response.data.id });
        e.preventDefault();
      } catch (error) {
        console.log(error)
      }
    }
  //  }, [])
    // //on vérifie l'entrée des input

  //   // //on fait appel a axios pour envoyer les données
  //   // try {
  //   //   await axios.post("http://localhost:3000/users/signup", JSON.stringify(values))
  //   //   return alert(values)
  //   // } catch (error) {
  //   //   console.log(error)
  //   // }
  // }

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

            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              placeholder="name"
              value = {name}
              required
              onChange={nameInput}>
            </input>


            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              value= {email}
              required
              onChange={emailInput}>
            </input>

            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value= {password}
              required
              onChange={passwordInput}/>

            <input type="submit" className="banner1" value="envoyer"/>
          </fieldset>
          {/* deuxieme formulaire */}
          <TbWorld size={"35px"} color="#FD2D01" />
        </form>
      </main>
    </>
  )
};