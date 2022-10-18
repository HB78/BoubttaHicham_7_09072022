import axios from 'axios'
import React, { useState } from 'react'

function DeletePosts({deletePosts}) {
  return (
    <i
      class="fa fa-sharp fa-solid fa-trash"
      title="effacer votre message" id="poubelle"
      onClick={deletePosts}>
    </i>
  )
}

export default DeletePosts