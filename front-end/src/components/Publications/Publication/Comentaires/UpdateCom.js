import axios from 'axios'
import React from 'react'
import apiurl from "../../../../api_url";

export default function UpdateCom({getComs}) {
    console.log('getComs:', getComs)
    
  return (
    <div>
      <button onClick={() => {
        //mettre un commentaire a propos de contenu
        axios.put(`${apiurl}/commentaires/message/${getComs.id}`, {
          contenu: "on a reussi"
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
        })

      }}>Mettre à jour le commentaire 5</button>
    </div>
  )
}
