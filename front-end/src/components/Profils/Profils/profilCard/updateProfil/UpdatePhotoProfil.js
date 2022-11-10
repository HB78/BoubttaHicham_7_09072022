import axios from 'axios';
import React, { useState } from 'react';
import "./updateProfil.css";
import apiUrl from "./../../../../../api_url"

export default function UpdatePhotoProfil() {
  const [newPhotoOfProfil, setNewPhotoOfProfil] = useState(null);

  const changePhotoProfil = (e) => {
    setNewPhotoOfProfil(e.target.files[0])
  }

  let formData = new FormData();
  formData.append("image", newPhotoOfProfil);

  const ID = localStorage.getItem("userId")

  const updatePhoto = async (e) => {
    e.preventDefault();
    await axios({
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'PUT',
      url: `${apiUrl}/users/photo/${ID}`,
      data: formData
    })
  }
  return (
    <form action="/upload" method="PUT" encType="multipart/form-data" onSubmit={updatePhoto}>
      <div>
        <input
          type="file"
          name='image'
          onChange={changePhotoProfil} />
        <input type="submit" value="Nouvelle photo" id='update_button'/>
      </div>
    </form>
  )
}
