import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Publication  from '../components/Publication';

export default function Forum() {
  const [posts, setPosts] = useState([])
//on affiche les publications de la BDD
useEffect(() => {
  getPosts()
}, [])

async function getPosts() {
  try {
    let res = await axios.get('http://localhost:3000/publication');
    // console.log("res.data", res.data);
    setPosts(res.data);
  } catch (error) {
    console.log(error)
  }
}


return (
    <Publication posts={posts}/>
  )
};
