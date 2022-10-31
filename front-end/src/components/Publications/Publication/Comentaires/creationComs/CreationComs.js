import axios from 'axios';
import React, { useState } from 'react';
import "./../creationComs/creationCom.css"

function CreationComs({idPublication, getPosts}) {
  console.log('idPublication:', idPublication)
  const [commentary, setCommentary] = useState('')

  //fonction pour récupérer la valeur de l'inputtapé par le user
  const commentInsideInput = (e) => {
    setCommentary(e.target.value)
  }

  //POST pour envoyer le commentaire
  async function sendCommentaire(e) {
    try {
      e.preventDefault()
      console.log("entrée de la requete")
      const sendOneCommentaire = await axios({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        method: 'POST',
        url: `http://localhost:3000/commentaires/message`,
        data: {
          contenu: commentary,
          id_publi: idPublication
        }
      })
      setCommentary('')
      console.log("sortie de la requete")
      // console.log("response du try", sendOnePublication.data.id)
      getPosts()
      // alert("Bravo la publication a éte envoyéé")
    } catch (error) {
      console.log(error, "ça ne marche pas")
      // alert(error.sendOnePublication.data.error)
    }
  }
  return (
    <div className='creation_com'>
      <input
        type="text"
        className="inputMessage"
        value={commentary}
        onChange={commentInsideInput} />
      <button
        className="btn_sendMessage"
        onClick={sendCommentaire}>{'>'}
      </button>
    </div>
  )
}

export default CreationComs
