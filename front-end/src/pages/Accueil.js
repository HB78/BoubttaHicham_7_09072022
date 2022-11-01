import React from 'react'
import globe from "../assets/globe.gif"
import alpha from "../assets/alpha.jpg"
import "../styles/accueil.css"
import "../styles/responsive/responsiveAcceuil.css"

import { Link } from 'react-router-dom'
export default function Accueil() {
  return (
    <div>
      <main className="main_acceuil">
        <div className="acceuil_contain">
            <img src={alpha} alt=''/>
        </div>
        <div className="acceuil_texte">
            <h1>Bienvenue sur le réseau social de l'entreprise Groupomania</h1>
            <h2><em>Groupomania for a better world</em></h2>
            <img src={globe} alt=''/>
            <div className="inscription">
                <Link to={"/signup"}><div className='btn_signup'>vous inscrire</div></Link>
                <Link to={"/login"}><div className='btn_login'>vous connecter</div></Link>
            </div>
        </div>
    </main>
    </div>
  )
}
