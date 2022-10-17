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