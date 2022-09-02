import React from 'react'
import { useEffect } from 'react';
import Loader from './Loader';
import "../styles/loader.css";
export default function Publication({posts}) {

useEffect(() => {
  // console.log("Publication props.posts", posts);
}, [posts])

function DisplayPosts() {
  console.log("DisplayPosts posts.length", posts.length);
  if (posts.length <= 0) {
    console.log("On a pas les posts");
    return <Loader />
  }
  return posts.map((element, index) => {
    return (
      <div key={index}>
        <p></p>
        <br />
      </div>
    )
  });
}

return (
  <>
    {/* <CreatePost> */}
    <DisplayPosts />
    {/* <div className="post">
      <input type="text" placeholder="le titre de votre publication"/>
      <input type="text" id="commentaire" placeholder="le contenu de votre publication"/>
      <input type="submit"/>
    </div>
    <div className="card">
      <div className="contenu">
        <div className="picture">
            <img src="" alt=""/>
            <p>Annie</p>
        </div>
        <h2>titre du poste</h2><br/>
        <div className="message">
          <div className="identity">
              <div><img src="" alt=""/></div>
              <span>Hicham</span>
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, assumenda 
            temporibus eligendi magni iusto, quas asperiores nobis iure molestiae voluptatem 
            deleniti nesciunt amet possimus architecto voluptatibus, delectus id omnis nostrum.
          </p>
          <br/>
        </div>
        <div className="submit">
          <input type="text"/><br/><br/>
          <input type="submit" value="envoyer"/>
        </div>
      </div>
    </div> */}
  </>
)}
