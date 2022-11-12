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
      className="fa fa-solid fa-marker"
      title="mettre à jour votre message"
      id="editer"
      onClick={toggleCom}>
    </i>
  )
}

export default UpdateCom