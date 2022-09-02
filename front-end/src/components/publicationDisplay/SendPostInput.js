import axios from 'axios';
import React, { useState } from 'react'

export default function SendPostInput() {
	//mise en place des states pour stocker les données des input
  const [titlePost, setTitlePost] = useState("");
  const [containPost, setContainPost] = useState("");

	//mise en place de fonctions pour récupérer les values des inputs

  const titleInput = (e) => {
    setTitlePost(e.target.value)
  }
  const containInput = (e) => {
    setContainPost(e.target.value)
  }
//on créer un objet qui va envoyer les données entrées par le user dans la BDD
const valuesPost = {
	titlePost: titlePost,
	containPost: containPost
}
//mise en place de la fonction pour envoyer les données à la BDD avec Axios
async function sendPosts(e) {
	try {
		e.preventDefault()
		const response = await axios.post("http://localhost:3000/publication", valuesPost)
		console.log(response.data)
	} catch (error) {
		console.log(error)
		alert(error.response.data.error)
	}
}
console.log(valuesPost)
	return (
		<>
			<div className="post">
				<input
					type="text"
					placeholder="le titre de votre publication" 
					value= {titlePost}
					required
					onChange={titleInput}/>
				<input
					type="text"
					id="commentaire"
					placeholder="le contenu de votre publication" 
					value={containPost}
					required
					onChange={containInput}/>
				<input
					type="submit" 
					value="envoyer"
					onSubmit= {sendPosts}/>
			</div>
		</>
	)
}
