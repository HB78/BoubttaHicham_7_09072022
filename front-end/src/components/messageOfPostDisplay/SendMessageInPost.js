import axios from 'axios';
import React, { useState } from 'react'

export default function SendMessageInPost() {
  //mise en place des states pour stocker les données des input
  const [message, setMessage] = useState("");

  //mise en place de fonctions pour récupérer les values des inputs

  const messageInput = (e) => {
    setMessage(e.target.value)
  }

  //on créer un objet qui va envoyer les données entrées par le user dans la BDD
  const valuesMessage = {
    message: message
  }
  //mise en place de la fonction pour envoyer les données à la BDD avec Axios
  async function sendPosts(e) {
    try {
      e.preventDefault()
      const response = await axios.post("http://localhost:3000/commentaires/message", valuesMessage)
      console.log(response.data)
    } catch (error) {
      console.log(error)
      alert(error.response.data.error)
    }
  }
  return (
    <>
      <div className="submit">
        <input
          type="text"
          value={message}
          required
          onChange={messageInput} />
        <br /><br />
        <input
          type="submit"
          value="envoyer"
          onClick={sendPosts} />
      </div>
    </>
  )
}
