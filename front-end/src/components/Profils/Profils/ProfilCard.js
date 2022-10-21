import React from 'react'
import "./profilCard.css";

export default function ProfilCard({data}) {
  return (
    <div class="containerCard">
        <div><img src={data.userPhoto} alt=""/></div>
        <p>{data.userName}</p>
        <p>Poste</p>
        <p>Decription</p>
    </div>
  )
}
