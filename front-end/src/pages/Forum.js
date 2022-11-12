import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Publication  from '../components/Publications/Publications';
import apiUrl from "../api_url";
import { useNavigate } from 'react-router-dom'

export default function Forum() {
  const [posts, setPosts] = useState([])
  console.log('posts from forum:', posts)
  
  useEffect(() => {
    getPosts()
  }, [])

  let navigate = useNavigate();

  async function getPosts() {
    try {
      let res = await axios({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        method: 'GET',
        url: `${apiUrl}/publication`
      });
      console.log("res.data", res.data);
      setPosts(res.data)
    } catch (error) {
      console.log(error)
      if(error.request.status === 401) {
        alert("Connectez vous pour accéder au site")
        navigate("/login");
      }
    }
  }

  return (
    <Publication posts={posts} getPosts={getPosts}/>
  )
};