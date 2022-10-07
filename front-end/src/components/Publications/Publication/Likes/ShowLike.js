// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { TbHeart } from "react-icons/tb";


// function ShowLike({ idLike }) {
//   console.log('idPubli:--> from like', idLike)
//   const [like, setLike] = useState([])
//   //on affiche les publications de la BDD
//   useEffect(() => {
//     getLike()
//   }, [])
//   async function getLike() {
//     try {
//       let res = await axios.get(`http://localhost:3000/publication/like/${idLike}`);
//       console.log("res.data", res.data);
//       setLike(res.data);
//       console.log(like, "affichage des likes")
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   function DisplayLike() {
//     return like.map((id, index) => {
//       return (
//         <div key={index} className='publicationsss'>
//           <p>{like}<span>{TbHeart}</span></p>
//         </div>
//       )
//     })
//   }
//   return (
//     <>
//       <DisplayLike />
//     </>
//   )
// }

// export default ShowLike
