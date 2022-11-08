import axios from 'axios';
import React, { useEffect, useState } from 'react'
import HeaderComponent from './Header/HeaderComponent';
import apiUrl from "./../api_url"

export default function Header() {
  const [oneUser, setOneUser] = useState(null)
  const ID = localStorage.getItem("userId")
  
  useEffect(() => {
    getOneUser()
  }, [])

  async function getOneUser() {
    try {
      let res = await axios({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        method: 'GET',
        url: `${apiUrl}/users/${ID}`
      });
      console.log("res.data", res.data);
      setOneUser(res.data)
      console.log(oneUser, "from profil")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <HeaderComponent oneUser={oneUser}/>
  )
}