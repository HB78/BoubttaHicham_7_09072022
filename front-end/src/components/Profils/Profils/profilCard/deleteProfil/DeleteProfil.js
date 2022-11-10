import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../../../auth/authContext';
import { useNavigate } from 'react-router-dom';
import apiUrl from "./../../../../../api_url"

function DeleteProfil({isAdmin, idUser, data}) {

  const authcthx = useContext(AuthContext)
  let navigate = useNavigate();

  // const modaleAlert = () => {
  //   Swal.fire({
  //     title: 'Etes vous sur de vouloir supprimer votre compte ?',
  //     text: "Ce sera irréversible",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Oui supprimer le compte'
  //   })
  // }
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
        // modaleAlert()
        authcthx.logout()
        navigate("/login", { replace: true });
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
    {(isAdmin === 1 || idUser === data[0].userID || data[0].id === idUser) ?  <input type="button" className='btn_delete_count' value={isAdmin === 1 ? "Supprimer le compte" : "Supprimer votre compte"} style={deleteAccountStyle} onClick={cancelCount}/> : null}
    </>
  )
}

export default DeleteProfil
