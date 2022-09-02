import React, {useEffect} from 'react'
import axios from 'axios'

export default function AxiosRequest() {
  
const getData = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos/')
     .then((res) => console.log(res.data))
     .catch((err)=> console.log(err))
} 
//le fait de mettre un array vide dans le useEffect signifie qu'on utilise pas de props
useEffect(
    () => {
        getData()
    },
[])

//effacer un commentaire
// const myHeaders = new Headers({
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + localStorage.getItem('token'),
// });
// const handleDeleteComment = (e) => {
//     e.preventDefault();
//     fetch(`http://localhost:3001/commentaires/message/${commentData.id}`, {
//         method: 'delete',
//         headers: myHeaders,
//     })
//         .then((res) => console.log(res))
//          window.location.reload()
// };

//faire un get pour obtenir la data a mettre dans un useEffect
// la data doit aller dans un state

// const [commentData, setCommentData] = useState([]);

// const myHeaders = new Headers({
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + localStorage.getItem('token'),
// });
// fetch(`http://localhost:3001/publication`, {
//     method: 'GET',
//     headers: myHeaders,
// })
//     .then((response) => response.json())
//     .then((data) => {
//         setPostData(data);
//         console.log('post data', postData);
//     });
return (
    <div></div>
  )
}
