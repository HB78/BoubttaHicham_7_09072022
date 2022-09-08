import React from 'react'
import globe from "../assets/globe.gif"
import alpha from "../assets/alpha.jpg"
import "../styles/accueil.css"
import { Link } from 'react-router-dom'
export default function Accueil() {
  return (
    <div>
      <main class="main">
        <div class="acceuil_contain">
            <img src={alpha} alt=''/>
        </div>
        <div class="acceuil_texte">
            <h1>Bienvenue sur le réseau social de l'entreprise Groupomania</h1>
            <h2><em>Groupomania for a better world</em></h2>
            <img src={globe} alt=''/>
            <div class="inscription">
                <Link to={"/signup"}><div>vous inscrire</div></Link>
                <Link to={"/login"}><div>vous connecter</div></Link>
            </div>
        </div>
    </main>
    </div>
  )
}
