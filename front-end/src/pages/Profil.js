import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiUrl from "../api_url";
import Profils from '../components/Profils/Profils';
import {useParams, useNavigate} from "react-router-dom";
import Error from "./../components/error 404/Error"

export default function Profil() {
  const [postsOfOneUser, setPostsOfOneUser] = useState({})
  let navigate = useNavigate();

  // const params = useParams();
  // const id = params.id;
  const {id} = useParams();
  
  useEffect(() => {
    getPostsOfOneUser()
  }, [id])

  async function getPostsOfOneUser() {
    try {
      let res = await axios.get(`${apiUrl}/publication/${id}`);
      console.log("res.data", res.data);
      setPostsOfOneUser(res.data)
      console.log(postsOfOneUser, "from profil")
    } catch (error) {
      console.log(error)
      alert(error.response.data)
      navigate("/error", { replace: true })
    }
  }
  return (
    <Profils data={postsOfOneUser} getPosts={getPostsOfOneUser}/>
  )
}
