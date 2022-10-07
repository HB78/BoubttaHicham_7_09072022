import axios from 'axios'
import React, { useState } from 'react'

function DeleteCom() {
  const [commentUpdate, setcommentUpdate] = useState(false)

  //fonction pour mettre en place un toggle
  //quand on clic sur le logo update on peut mettre a jour le commentaire
  function updateComToggle() {
    setcommentUpdate(!commentUpdate)
  }
  async function deleteCommentaire({data}) {
    try {
      const deleted = await axios.delete("http:localhost:3000/publication")
      console.log(deleted, "message deleted")
    } catch (error) {
      console.log(error, "supression échouée")
    }
  }
  return (
    <div className="cards_message_icone">
      <i
        class="fa fa-sharp fa-solid fa-trash"
        title="effacer votre message" id="poubelle"
        onClick={deleteCommentaire}>
      </i>
      <i
        class="fa fa-solid fa-marker"
        title="mettre à jour votre message"
        id="editer"
        onClick={updateComToggle}>
      </i>
    </div>
  )
}

export default DeleteCom

//dois-je mettre un header comme celui d'en bas ?
// const headers = {
//   'Authorization': 'Bearer my-token',
//   'My-Custom-Header': 'foobar'
// };

//dois-je utiliser le useEffect pour faire appelle a axios ?