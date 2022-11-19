import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../../../auth/authContext';
import { useNavigate } from 'react-router-dom';
import apiUrl from "./../../../../../api_url"
import Swal from "sweetalert2"

function DeleteProfil({isAdmin, idUser, data}) {
console.log('data:FROOOM PROFIL', data)

let id = data[0].userID
console.log('idWithPost:', id)
// let idWithNoPost = data[0].id
// console.log('idWithNoPost:', idWithNoPost)

  const authcthx = useContext(AuthContext)
  let navigate = useNavigate();

  const modaleAlert = () => {
    Swal.fire({
      title: 'Etes vous sur de vouloir supprimer votre compte ?',
      text: "Ce sera irréversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui supprimer le compte'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Compte supprimé!',
          'A bientot !'
        )
        authcthx.logout()
        navigate("/login", { replace: true });
      }
    })
  }
  const modaleAlertAdmin = () => {
    Swal.fire({
      title: 'Etes vous sur de vouloir supprimer votre compte ?',
      text: "Ce sera irréversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer cet utilisateur'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Compte supprimé par un admin!',
          'Cet utilisateur est supprimé !'
        )
        navigate("/publication", { replace: true });
      }
    })
  }
    const cancelCount = async (e) => {
        e.preventDefault();
        await axios({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          },
          method: 'DELETE',
          url: `${apiUrl}/users/${idUser}`,
          // data: JSON.stringify(localStorage.getItem("userId"))
        })
        modaleAlert()
      }
    const cancelCountByAdmin = async (e) => {
        e.preventDefault();
        await axios({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          },
          method: 'DELETE',
          url: `${apiUrl}/users/admin/${id}`,
          // data: JSON.stringify(localStorage.getItem("userId"))
        })
        modaleAlertAdmin()
      }
      const deleteAccountStyle = {
        width: "57%",
        cursor: "pointer",
        background: "red",
        color: "white",
        padding: "0.70rem 0rem",
        border: "transparent"
      }
  return (
    <>
    {(isAdmin === 1 || idUser === data[0].userID || data[0].id === idUser) ?  <input type="button" title="Supprimer le compte" className='btn_delete_count' value={isAdmin === 1 ? "Supprimer le compte" : "Supprimer votre compte"} style={deleteAccountStyle} onClick={isAdmin === 1 ? cancelCountByAdmin : cancelCount}/> : null}
    </>
  )
}

export default DeleteProfil
