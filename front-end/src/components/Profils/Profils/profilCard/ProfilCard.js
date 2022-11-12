import React, { useContext, useState } from 'react'
import "./profilCard.css";
import photoProfil from "./../../../../assets/profil.png"
import AuthContext from '../../../../auth/authContext'
import DeleteProfil from './deleteProfil/DeleteProfil';
import UpdateJob from "./../profilCard/updateProfil/UpdateJob";
import UpdatePassword from "./../profilCard/updateProfil/UpdatePassword";
import UpdateDescriptionOfUser from "./../profilCard/updateProfil/UpdateDescriptionOfUser";
import UpdatePhotoProfil from "./../profilCard/updateProfil/UpdatePhotoProfil";
import styled from 'styled-components';
import "./../../profilResponsive/profilResponsive.css"


export default function ProfilCard({ data, getPosts }) {
  console.log('data: from profil perso', data)

  const [isUpdateVisible, setIsUpdateVisible] = useState(false)
  console.log('isUpdateVisible:', isUpdateVisible)

  //une fonction toggle qui va donner l'inverse du useState update
  const showUpdate = () => {
    setIsUpdateVisible(!isUpdateVisible)
    if(isUpdateVisible === true) {
      getPosts()
    }
  }

  const authx = useContext(AuthContext)
  const isAdmin = JSON.parse(authx.isAdmin)
  const idUser = JSON.parse(authx.userId)
  console.log('data:car violette profil', idUser)
  console.log(typeof isAdmin)

  const StyledProfilUpdate = styled.div`
  width: 50%;
  text-align: center;
`
const updateAccountStyle = {
  width: "57%",
  cursor: "pointer",
  background: "green",
  color: "white",
  padding: "0.70rem 0rem",
  border: "transparent",
  fontWeight: "600"
}
  return (
    <section className="containerCard">
      <div>
        <img src={(data === null || data[0].userPhoto === null) ? photoProfil : data[0].userPhoto} alt="" 
        className='img_In_Profil'/>
      </div>
      <div>{data[0].userName}</div>
      <StyledProfilUpdate className='form_update'>
        {data[0].poste === null ? "Poste: Un petit nouveau qui n'a pas encore renseigné son champ" : data[0].poste}
        {isUpdateVisible === true ?<UpdateJob getPosts={getPosts}/> : null}
      </StyledProfilUpdate>
      <StyledProfilUpdate className='form_update'>
        {data[0].description === null ? "Description : Un grand timide ?" : data[0].description}
        {isUpdateVisible === true ? <UpdateDescriptionOfUser /> : null}
      </StyledProfilUpdate>
      <StyledProfilUpdate className='form_update'>
        {isUpdateVisible === true ? <UpdatePassword /> : null}
      </StyledProfilUpdate>
      <StyledProfilUpdate className='form_update'>
        {isUpdateVisible === true ? <UpdatePhotoProfil /> : null}
      </StyledProfilUpdate>
      {(idUser === data[0].userID || data[0].id === idUser) ? <input type="button" className='btn_update_count' value={isUpdateVisible ? "Enregistrer" : "Mise à jour du profil"} style={updateAccountStyle} onClick={showUpdate} /> : null }
      <DeleteProfil isAdmin={isAdmin} idUser={idUser} data={data} />
    </section>
  )
}