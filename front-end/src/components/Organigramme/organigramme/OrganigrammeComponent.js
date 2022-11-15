import React from 'react';
import "./organigramme.css";
import "./../organigramme/responsiveOrg.css"
import imageProfil from "./../../../assets/profil.png";

const OrganigrammeComponent = ({ dataUser, item }) => {
  console.log('item:', item.length)

  const noFoundStyle = {
   color: "white",
   fontSize: "1.5rem",
   letterSpacing: "0.5rem"
  }

  if(item.length > 3) {
    return <article style={noFoundStyle}>Affinez votre recherche</article>
  }
  
  return (
    item.map((users, index) => {
      return (
        <article className="container_flip_card_inner" key={index}>
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
