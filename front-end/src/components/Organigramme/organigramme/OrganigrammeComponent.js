import React from 'react';
import "./organigramme.css";
import imageProfil from "./../../../assets/profil.png";

const OrganigrammeComponent = ({ dataUser, item }) => {
  console.log('item:', item.length)
  
  return (
    item.map((users, index) => {
      return (
        <article className="container_flip_card_inner">
        <div className="front_face">
          <img src={users.image_profil === null ? imageProfil : users.image_profil} alt="" />
        </div>
        <div className="back_face">
          <h2>{users.name}</h2>
          <p>{users.poste}</p>
        </div>
      </article>
      )
  })

  )
}

export default OrganigrammeComponent
