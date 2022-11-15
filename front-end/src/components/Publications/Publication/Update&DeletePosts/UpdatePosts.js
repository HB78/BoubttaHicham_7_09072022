import React from 'react'

function UpdatePosts({ togglePosts }) {
  return (
      <i
        className="fa fa-solid fa-marker"
        title="mettre à jour votre message"
        id="editer"
        onClick={togglePosts}>
      </i>
  )
}

export default UpdatePosts