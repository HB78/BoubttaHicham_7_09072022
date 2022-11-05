import React from 'react';
import styled from 'styled-components';
import Loader from './../Loader/Loader';
import ProfilPost from './Profils/ProfilPost'
import ProfilCard from './Profils/profilCard/ProfilCard';
import profilPhoto from "./../../assets/profil.png"
import Header from './../Header';
import Footer from "./../Footer"
import "./profilResponsive/profilResponsive.css"

export default function Profils({ data, getPosts }) {
  console.log('data:--> from profils page', data)

  const StyledPublicationPageProfil = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background:#ebdded;
    padding: 1.5rem 0rem;
  `
  function DisplayPosts() {
    return data.map((post, index) => {
      return (
        <ProfilPost key={index} data={post} getPosts= {getPosts}/>
      )
    });
  }
  
  return (
    <>
      {data.length > 0 ?
      <>
     <Header />
        <StyledPublicationPageProfil>
          <ProfilCard data={data}/>
          <DisplayPosts />
        </StyledPublicationPageProfil>
      <Footer />
      </>
        : <Loader />}
    </>
  )
}
// function DisplayNoPublicationInProfil() {
//   return(
//      <div className="card_profil">
//       <div>
//         <div className="sub-menu_profil">
//           <div>
            
//           </div>
//           <h2>La première publication arrive bientot</h2>
//           {/* <!-- MENU INTERNE DANS LA CARD --> */}
//           <div className="right_profil">
            
//           </div>
//         </div>
//         <p className='publication_description_profil '>Il n'y a aucun contenu à ce jour</p>
//         <div className="card_imagePosted_profil"><img src={data.photoPost} alt="" /></div>
//       </div>
//       <div className="cards_autor_profil">
//         <div className="cards_autor_img_profil">
//           <img src={data.userPhoto === null ? profilPhoto : data.userPhoto} alt="" className="cards_autor_img_autor_profil" />
//           <p>{data.userName}</p>
//         </div>
//         <div className="cards_autor_identity">
//           <p>posté le</p>
//         </div>
//       </div>
//       <div className="bar_profil"></div>
//       <button className="show_comment"><p>Commentaires</p></button>
//     </div>
//   )
// }