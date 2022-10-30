import axios from 'axios';
import React, { useContext, useState } from 'react';

function DeleteCom({ deleteCommentaire, getPosts, id, isAdmin }) {

  //Une fonction pour permettre à un administrateur d'effacer son commentaire 
  const deleteCommentByAdmin = async (e) => {

    e.preventDefault();
    const deleteOneCommentByAdmin = await axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'DELETE',
      url: `http://localhost:3000/commentaires/admin/message/${id}`
    })
    alert("commentaire effacé par un administrateur")
    getPosts()
  }

  return (
    <i
      class="fa fa-sharp fa-solid fa-trash"
      title="effacer votre message" id="poubelle"
      onClick={isAdmin === 1 ? deleteCommentByAdmin : deleteCommentaire} >
    </i>
  )
}

export default DeleteCom