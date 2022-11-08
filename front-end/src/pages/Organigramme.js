import axios from 'axios';
import React, { useEffect, useState } from 'react';
import apiUrl from './../api_url';
import Organigrammes from "../components/Organigramme/Organigrammes"

export default function Organigramme() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  async function getUsers() {
    try {
      let res = await axios({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        method: 'GET',
        url: `${apiUrl}/users/organigramme`,
      });
      console.log("res.data", res.data);
      setUsers(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Organigrammes data={users}/>
  )
}
