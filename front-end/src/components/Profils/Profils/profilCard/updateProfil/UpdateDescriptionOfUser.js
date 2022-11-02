import axios from 'axios'
import React, { useState } from 'react';
import "./updateProfil.css";

export default function UpdateDescriptionOfUser() {
  const [descriptionOfUser, setDescriptionOfUser] = useState("")

  const description = (e) => {
    setDescriptionOfUser(e.target.value)
  }

  let valuesDescription = {
    description: descriptionOfUser
  }
  const ID = localStorage.getItem("userId")

  const updateDescription = async (e) => {
    e.preventDefault();
    await axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'PUT',
      url: `http://localhost:3000/users/description/${ID}`,
      data: valuesDescription
    })
    setDescriptionOfUser("")
  }
  return (
          <form onSubmit={updateDescription}>
            <input type="text"
              required placeholder="décrivez-vous"
              value={descriptionOfUser}
              onChange={description} />
            <input type="submit" value="Envoyer" id="update_button"/>
          </form>
  )
}
