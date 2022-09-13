import "./comentaires.css";
import  React, { useEffect, useState } from 'react';
// import apiurl from "~/src/api_url";
import apiurl from "../../../../api_url";
import axios from "axios";

function Comentaires({idPubli}) {
  console.log('idPubli:', idPubli)
  const [comments, setComments] = useState([])
  useEffect(() => {
    console.log("apiurl", apiurl);
    getComs()
  }, [])

  async function getComs() {
    if (comments.length <= 0) {
      try {
        let res = await axios.get(`${apiurl}/commentaires/message/${idPubli}`); // ajouter id depuis props
        console.log("commentaire res.data", res.data);
        setComments(res.data);
      } catch (error) {
        console.log(error)
      }
    }
  }

  function DisplayComs(props) {
    return comments.map((com, index) => {
      return (
        <p>{com.contenu}</p>
      )
    });
  }

  return (
    <div>
      <DisplayComs />
    </div>
  )
}

export default Comentaires;
