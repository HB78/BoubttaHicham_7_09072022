import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ShowMessageOfCard() {
  const [comment, setComment] = useState([])
  //on affiche les publications de la BDD
  useEffect(() => {
    getComment()
  }, [])
  
  async function getComment() {
    try {
      let res = await axios.get('http://localhost:3000/publication');
      // console.log("res.data", res.data);
      setComment(res.data);
    } catch (error) {
      console.log(error)
    }
  }
  return comment.map((el, index) => {
    return (
      <>
      <div className="message">
        <div className="identity">
          <div><img src= {el.image_profil} alt="" /></div>
          <span>{el.name}</span>
        </div>
        <p>
        {el.contenu}
        </p>
        <br />
      </div>
    </>
    )
  });
}
