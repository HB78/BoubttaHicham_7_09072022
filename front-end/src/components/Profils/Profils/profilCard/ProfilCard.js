import React, { useContext } from 'react'
import "./profilCard.css";
import photoProfil from "./../../../../assets/profil.png"
import AuthContext from '../../../../auth/authContext'
import DeleteProfil from './deleteProfil/DeleteProfil';

export default function ProfilCard({data}) {
console.log('data: from profil perso', data)

  const authx = useContext(AuthContext)
  const isAdmin = JSON.parse(authx.isAdmin)
  const idUser = JSON.parse(authx.userId)
  console.log('data:car violette profil', idUser)
  console.log(typeof isAdmin)
  
  return (
    <section class="containerCard">
        <div><img src={(data === null || data[0].userPhoto === null) ? photoProfil : data[0].userPhoto} alt=""/></div>
        <p>{data[0].userName}</p>
        <p>{data[0].poste === null ? "Poste: Un petit nouveau qui n'a pas encore renseigné son champ" : data[0].poste}</p>
        <p>{data[0].description === null ? "Description : Un grand timide ?" : data[0].description}</p>
        {(isAdmin === 1 || idUser === data[0].userID) ?  <input type="button" value="mise à jour de votre  profil" id= 'update_profil' /> : null}
       <DeleteProfil isAdmin={isAdmin} idUser={idUser} data={data}/>
    </section>
  )
}
