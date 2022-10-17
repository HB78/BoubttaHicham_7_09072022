import axios from 'axios'
import React, { useState } from 'react'

function UpdatePosts({togglePosts}) {

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
      onClick={togglePosts}>
    </i>
  )
}

export default UpdatePosts