import axios from 'axios'
import React, { useState } from 'react'
import apiurl from "../../../../api_url";

export default function UpdateCom({ getComs }) {
  const [comUpdated, setComUpdated] = useState("");
  
  const coms = (e) => {
    setComUpdated(e.target.value)
  }
  console.log('getComs:', getComs)
  //fonction qui met à jour le commentaire
  const update = async () => {
    try {
      const axiosPutCom = await axios.put(`${apiurl}/commentaires/message/${getComs.id}`, {
        contenu: { comUpdated }
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      })
      console.log(axiosPutCom)
    } catch (error) {
      console.log(error)
    }
  }
  function ShowUpdate() {
    <div>
      <input
        type="text"
        value={comUpdated}
        onChange={coms} />
      <button onClick={update()}>{'>'}</button>
    </div>
  }
  return (
    <div>
      <ShowUpdate />
    </div>
  )
}
//dois-je utiliser le useEffect pour faire appelle a axios ?