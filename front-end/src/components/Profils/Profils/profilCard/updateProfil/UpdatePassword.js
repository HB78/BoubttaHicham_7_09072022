import axios from 'axios'
import React, { useState } from 'react';
import "./updateProfil.css";

export default function UpdatePassword() {
    const [newPassword, setNewPassword] = useState("")

    const password = (e) => {
        setNewPassword(e.target.value)
      }

      const ID = localStorage.getItem("userId")
      const updatePassword = async (e) => {
        e.preventDefault();
        await axios({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          },
          method: 'PUT',
          url: `http://localhost:3000/users/password/${ID}`,
          data: {
            password: newPassword
          }
        })
        setNewPassword("")
      }
  return (
          <form onSubmit={updatePassword}>
            <input type="password"
              required placeholder="votre nouveau mot de passe"
              value={newPassword}
              onChange={password} />
            <input type="submit" value="Envoyer" id='update_button'/>
          </form>
  )
}
