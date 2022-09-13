import React, { useState } from 'react'
import "./publication.css";
import Comentaires from "./Comentaires/Comentaires";

//Ici c'est le componant qui va afficher la card
//C'est ce component qui va atre afficher dans le composant parent PublicationS
//Avec le useState display on met en place un toggle
//Si c'est true on affiche les messages sinon on ne les affiche pas
//A noter que la condition {dislayCom && <Comentaires />} on ne la pas mise dans la balise bouton
//A noter que <commenttaire /> est un composant d'une autre page qui sert a faire une requete get et avoir les messages
export default function Publication({ data }) {
  const [dislayCom, setDislayCom] = useState(false)

  async function getComment() {
    setDislayCom(!dislayCom);
  }
  return (
    <div className="publication_card">
      <h2>{data.title}</h2>
      <div>{data.userName} <span>posté le {data.date_publi}</span></div>
      <p>{data.contenu}</p>
      <br />
      {/* <div><ShowLike idPubli = {element.id}/></div> */}
      {/* <p><Comentaires idPubli={data.id} /></p> */}
      <button onClick={getComment}><p>Commentaires</p></button>
      {dislayCom && <Comentaires idPubli={data.id}/>}
    </div>
  )
}