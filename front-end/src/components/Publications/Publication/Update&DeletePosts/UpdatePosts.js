import axios from 'axios'
import React, { useState } from 'react'

function UpdatePosts({ togglePosts }) {
  return (
      <i
        class="fa fa-solid fa-marker"
        title="mettre à jour votre message"
        id="editer"
        onClick={togglePosts}>
      </i>
  )
}

export default UpdatePosts