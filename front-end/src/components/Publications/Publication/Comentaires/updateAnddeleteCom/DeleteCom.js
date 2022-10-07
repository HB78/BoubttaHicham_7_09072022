import axios from 'axios'
import React, { useState } from 'react'

function DeleteCom({deleteCommentaire}) {

  return (
    <i
      class="fa fa-sharp fa-solid fa-trash"
      title="effacer votre message" id="poubelle"
      onClick={deleteCommentaire}>
    </i>
  )
}

export default DeleteCom

//dois-je mettre un header comme celui d'en bas ?
// const headers = {
//   'Authorization': 'Bearer my-token',
//   'My-Custom-Header': 'foobar'
// };

//dois-je utiliser le useEffect pour faire appelle a axios ?