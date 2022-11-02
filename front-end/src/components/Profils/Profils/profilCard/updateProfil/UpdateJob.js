import axios from 'axios';
import React, { useState } from 'react';
import "./updateProfil.css";

const UpdateProfil = () => {
const [titleOfJob, setTitleOfJob] = useState("")


const job = (e) => {
    setTitleOfJob(e.target.value)
  }
  
  let values = {
    poste: titleOfJob
  }
  const ID = localStorage.getItem("userId")
  const updateJob = async (e) => {
    e.preventDefault();
    await axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'PUT',
      url: `http://localhost:3000/users/poste/${ID}`,
      data: values
    })
    setTitleOfJob("")
  }
  return (
        <form onSubmit={updateJob}>
          <input type="text" 
          required placeholder="le titre de votre poste" 
          value={titleOfJob}
          onChange={job}/>
          <input type="submit" value="Envoyer" id='update_button'/>
        </form>
  )
}

export default UpdateProfil
