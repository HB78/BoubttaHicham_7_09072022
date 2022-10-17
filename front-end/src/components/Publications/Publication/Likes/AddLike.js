// import axios from 'axios';
// import React from 'react'

// export default function AddLike({idPubliLike}) {
//   const addLove = async (e) => {
//     e.preventDefault();
//     const addLoves = await axios({
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + localStorage.getItem("token")
//         },
//         method: 'PUT',
//         url: `http://localhost:3000/publication/like/${idPubliLike}`,
//         data: {
//         love: 1,
//         }
//     })
// }
//   return (
//     addLove()
//   )
// }
