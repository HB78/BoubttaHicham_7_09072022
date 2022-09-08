// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// function ShowLike({idPubli}) {
//     const [like, setLike] = useState([])
//     //on affiche les publications de la BDD
//     useEffect(() => {
//         getLike()
//     }, [])
//     async function getLike() {
//         try {
//           let res = await axios.get("http://localhost:3000/publication/like/5");
//           console.log("res.data", res.data);
//           setLike(res.data);
//         } catch (error) {
//           console.log(error)
//         }
//       }
//       return idPubli.map((id, index) => {
//         return (
//         <div key={index} className='publication'>
//           <p>{like}</p>
//         </div>
//         )
//       })
// }

// export default ShowLike
