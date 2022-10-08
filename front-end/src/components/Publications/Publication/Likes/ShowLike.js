import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TbHeart } from "react-icons/tb";
// import apiurl from "../../../api_url";


export default function ShowLike({ idPubliLike }) {
  console.log('idPubli:--> from like', idPubliLike)
  const [like, setLike] = useState([])
  //on affiche les publications de la BDD
  useEffect(() => {
    getLike()
  }, [])

  async function getLike() {
    try {
      let res = await axios.get(`http://localhost:3000/publication/like/${idPubliLike}`);
      setLike(res.data);
      console.log(like, 'le resultat du axios pour les likes')
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
    {like}
    </>
  )
  // return like.map((id, index) => {
    //   return (
    //     <div key={index} className='publicationLike'>
    //       <p>{like}<span>{TbHeart}</span></p>
    //     </div>
    //   )
    // })
}

