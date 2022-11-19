import axios from 'axios';
import React, { useContext } from 'react';
import AuthContext from '../../../auth/authContext';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiUrl from "./../../../api_url"

function deletePostsByAdminProfil({ deletePosts, data }) {

  const authCTX = useContext
  const contexte = authCTX(AuthContext)
  const isAdmin = contexte.isAdmin
  //Une fonction qui permet à l'admin de supprimer une publication


  const deletePostsByAdmin = async (e) => {
    e.preventDefault();
    const deleteOnePostsByAdmin = await axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'DELETE',
      url: `${apiUrl}/publication/admin/${data.id}`,
      // data: JSON.stringify(localStorage.getItem("userId"))
    })
    notify()
  }

  //un toast 
  const notify = () => {
    toast.success('publication effacée par un administrateur', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }
  return (
    <>
    <i
      className="fa fa-sharp fa-solid fa-trash"
      title="effacer votre message" id="poubelle"
      onClick={isAdmin === 1 ? deletePostsByAdmin : deletePosts}>
    </i>
    <ToastContainer transition={Zoom} />
    </>
  )
}

export default deletePostsByAdminProfil