import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import apiUrl from "../api_url";
import Profils from '../components/Profils/Profils';
import {useParams, useNavigate} from "react-router-dom";
import AuthContext from "./../auth/authContext";

export default function Profil() {
  const [postsOfOneUser, setPostsOfOneUser] = useState({})
  let navigate = useNavigate();

  //SI LE USER N'A PAS DE TOKEN IL SERA REDIRIGE
  const authCtx = useContext(AuthContext)  
  console.log(authCtx.isLoggedIn, "TEST profil authx")

  useEffect(() => {
    if(!authCtx.isLoggedIn){
      navigate("/login");
    }
  }, [])
  
  // const params = useParams();
  // const id = params.id;
  const {id} = useParams();
  
  useEffect(() => {
    getPostsOfOneUser()
  }, [id])

  async function getPostsOfOneUser() {
    try {
      let res = await axios({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        method: 'GET',
        url: `${apiUrl}/publication/${id}`
      });
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