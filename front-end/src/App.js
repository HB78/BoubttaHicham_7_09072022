import Connexion from "./pages/Connexion";
import React, {useEffect} from "react";
import { Routes, Route} from "react-router-dom";
import ConnexionLogin from "./pages/ConnexionLogin";
import Forum from "./pages/Forum";
import Organigramme from "./pages/Organigramme";
import Profil from "./pages/Profil"
import axios from 'axios'

// visiblement le Routes a remplacé le switch


function App() {
// -->La page Forum

//on affiche les publications de la BDD
const getData = () => {
  axios.get('http://localhost:3000/publication/like')
   .then((res) => console.log(res.data, "data from app.js"))
   .catch((err)=> console.log(err))
}
useEffect(
  () => {
      getData()
  },
[])

// //mise à jour de la publication
// const putData = axios({
//   method: 'put',
//   url: 'http://localhost:3000/publication/id',
//   data: {
//       title: 'Making PUT Requests with Axios',
//       status: 'published'
//   }
// })
// useEffect(
//   () => {
//       putData()
//   },
// []) //quel est le problème ici ?

//suppression de la publication 

  return (
    <div className="App">
      <Routes>
        <Route path="/profil/:id" element= {<Profil />}></Route>
        <Route exact path="/signup" element= {<Connexion />}></Route>
        <Route exact path="/login" element= {<ConnexionLogin />}></Route>
        <Route path="/publication" element= {<Forum />}></Route>
        <Route path="/organigramme" element= {<Organigramme />}></Route>
      </Routes>
    </div>
  );
}

export default App;