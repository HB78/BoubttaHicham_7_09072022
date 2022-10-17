import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiUrl from "../api_url";

export default function Profil() {
  const [postsOfOneUser, setPostsOfOneUser] = useState([])
  
  useEffect(() => {
    getPostsOfOneUser()
  }, [])

  async function getPostsOfOneUser() {
    try {
      let res = await axios.get(`${apiUrl}/publication/36`);
      console.log("res.data", res.data);
      setPostsOfOneUser(res.data)
      console.log(postsOfOneUser, "from profil")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
     
    </div>
  )
}
