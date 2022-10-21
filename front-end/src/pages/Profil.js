import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiUrl from "../api_url";
import Profils from '../components/Profils/Profils';
import {useParams} from "react-router-dom";

export default function Profil() {
  const [postsOfOneUser, setPostsOfOneUser] = useState({})

  // const params = useParams();
  // const id = params.id;
  const {id} = useParams();
  
  useEffect(() => {
    getPostsOfOneUser()
  }, [])

  async function getPostsOfOneUser() {
    try {
      let res = await axios.get(`${apiUrl}/publication/${id}`);
      console.log("res.data", res.data);
      setPostsOfOneUser(res.data)
      console.log(postsOfOneUser, "from profil")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Profils data={postsOfOneUser} getPosts={getPostsOfOneUser}/>
  )
}
