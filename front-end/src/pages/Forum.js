import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Publication  from '../components/Publications/Publications';
import apiUrl from "../api_url"


export default function Forum() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    getPosts()
  }, [])

  async function getPosts() {
    try {
      let res = await axios.get(`${apiUrl}/publication`);
      console.log("res.data", res.data);
      setPosts(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Publication posts={posts}/>
  )
};
