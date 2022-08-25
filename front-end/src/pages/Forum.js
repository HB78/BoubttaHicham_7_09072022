import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function Forum() {

  const getPublicatgion = () => {
    axios.get("http://localhost:3000/publication")
     .then((res) => console.log(res.data, "les données de l'api"))
     .catch((err)=> console.log(err))} 
//le fait de mettre un array vide dans le useEffect signifie qu'on utilise pas de props
useEffect(
    () => {
        getPublicatgion()
    },
[])
return (
    <div>
     
    </div>
  )
};

 // <div>
      //   <input type="text" id='title'/>
      //   <input type="text" id='contenu de la publication'/>
      //   <input type="submit" id='sendPublication'/>
      // </div>