import axios from 'axios'
import React, { useState } from 'react'

function UpdateCom({toggleCom}) {

  //fonction pour mettre en place un toggle
  //quand on clic sur le logo update on peut mettre a jour le commentaire
  /*function updateComToggle() {
    setcommentUpdate(!commentUpdate)
  }*/
  return (
    <i
      class="fa fa-solid fa-marker"
      title="mettre à jour votre message"
      id="editer"
      onClick={toggleCom}>
    </i>
  )
}

export default UpdateCom

//dois-je mettre un header comme celui d'en bas ?
// const headers = {
//   'Authorization': 'Bearer my-token',
//   'My-Custom-Header': 'foobar'
// };

//dois-je utiliser le useEffect pour faire appelle a axios ?