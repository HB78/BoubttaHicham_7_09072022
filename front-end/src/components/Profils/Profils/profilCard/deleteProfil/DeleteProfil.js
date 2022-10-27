import React from 'react';
import axios from 'axios'

function DeleteProfil({isAdmin, idUser, data}) {

    const cancelCount = async (e) => {
        e.preventDefault();
        const cancelCountOfUser = await axios({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          },
          method: 'DELETE',
          url: `http://localhost:3000/users/delete/${idUser}`,
          // data: JSON.stringify(localStorage.getItem("userId"))
        })
        alert("votre compte à été supprimé")
      }

  return (
    <>
    {(isAdmin === 1 || idUser === data[0].userID) ?  <input type="button" value="supprimer votre compte" id= 'delete_count' onClick={cancelCount}/> : null}
    </>
  )
}

export default DeleteProfil
