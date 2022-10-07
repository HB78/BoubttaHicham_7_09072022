import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import UpdateCom from "./updateAnddeleteCom/UpdateCom";
import DeleteCom from "./updateAnddeleteCom/DeleteCom";


export default function Commentaire({ photosInMessage, com, getPosts }) {
    console.log('com:', com)
    const [updating, setUpdating] = useState(false)
    const [comment, setComment] = useState(com.contenu);

    const toggleCom = () => {
      setUpdating(!updating);
    }

    const onChangeComment = (e) => {
        setComment(e.target.value);
    }

    const updateComment = async (e) => {
        e.preventDefault();
        const updateOneComment = await axios({
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            method: 'PUT',
            url: `http://localhost:3000/commentaires/message/${com.id}`,
            data: {
              contenu: comment
            }
        })
        toggleCom();
        getPosts()
    }

    const deleteComment = async (e) => {
        e.preventDefault();
        const deleteOneComment = await axios({
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            method: 'DELETE',
            url: `http://localhost:3000/commentaires/message/${com.id}`
        })
        getPosts()
    }

  return (
    <div className="messages">
        <div className="cards_message">
        <div className="card_message_header">
            <div>
            <img src={photosInMessage()} alt="" className="cards_autor_img_autor" />
            </div>
            <p>{com.name}</p>
            {(com.id_user === parseInt(localStorage.getItem("userId"))) && <div className="cards_message_icone">
                <UpdateCom toggleCom={toggleCom} />
                <DeleteCom deleteCommentaire={deleteComment} />
            </div>}
            {/*<DeleteCom />*/}
        </div>
        {updating ?
            <div>
                <input
                    type="text"
                    value={comment}
                    onChange={onChangeComment} />
                <button onClick={updateComment}>{'>'}</button>
            </div>
        :
        <p>{com.contenu}</p>
        }
        </div>
    </div>
  )
}