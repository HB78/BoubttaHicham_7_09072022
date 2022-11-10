import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import UpdateCom from "./UpdateCom";
import DeleteCom from "./DeleteCom";
import "./updateAndDeleteIcon.css";
import AuthContext from '../../../../../auth/authContext';
import apiUrl from "./../../../../../api_url"

export default function Commentaire({ profil, com, getPosts }) {
console.log('com:--->commmmm', com)

  const [updating, setUpdating] = useState(false)
  const [comment, setComment] = useState(com.contenu);

  const toggleCom = () => {
    setUpdating(!updating);
  }

  const onChangeComment = (e) => {
    setComment(e.target.value);
  }

  const authCtx = useContext(AuthContext)
  const isAdmin = JSON.parse(authCtx.isAdmin)

  const updateComment = async (e) => {
    e.preventDefault();
    const updateOneComment = await axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'PUT',
      url: `${apiUrl}/commentaires/message/${com.id}`,
      data: {
        contenu: comment
      }
    })
    toggleCom();
    getPosts()
  }

  //Une fonction pour permettre à un user d'effacer son commentaire 
  const deleteComment = async (e) => {
    e.preventDefault();
    const deleteOneComment = await axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'DELETE',
      url: `${apiUrl}/commentaires/message/${com.id}`
    })
    getPosts()
  }

  return (
    <div className="messages">
      <div className="cards_message">
        <div className="card_message_header">
          <div>
            <img src={(com.image_profil === null || com === null) ? profil : com.image_profil} alt="" className="cards_autor_img_autor" />
          </div>
          <p>{com.name}</p>
          {(com.id_user === parseInt(localStorage.getItem("userId")) || isAdmin === 1) && <div className="cards_message_icone">
            <UpdateCom toggleCom={toggleCom} />
            <DeleteCom deleteCommentaire={deleteComment} getPosts={getPosts} id={com.id} isAdmin={isAdmin}/>
          </div>}
          {/*<DeleteCom />*/}
        </div>
        {updating ?
          <div className='updateComToggledContainer'>
            <input
              type="text"
              value={comment}
              onChange={onChangeComment}
              className="updateComToggled" />
            <button className="updateComToggledbtn" onClick={updateComment}>{'>'}</button>
          </div>
          :
          <p>{com.contenu}</p>
        }
      </div>
    </div>
  )
}