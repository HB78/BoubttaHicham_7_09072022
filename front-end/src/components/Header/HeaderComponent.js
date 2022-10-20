import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import './headerComponent.css';
import { Link } from "react-router-dom";
import profilPhoto from "./../../assets/profil.png";

export default function Header({ oneUser }) {
console.log('oneUser:', oneUser)

//composant qui va afficher le menu cacher au clic sur la photo
const [menuVisible, setMenuVisible] = useState(false)
const menuAppear = () => {
    setMenuVisible(!menuVisible)
}
function DisplayHiddenMenu() {
    return (
        <div className={menuVisible ? 'menu-box' : 'close-menu'}>
            <ul>
                <li><Link to={'/publication'}>Accueil</Link></li>
                <li><Link to={'/profil'}>Profil</Link></li>
                <li><Link to={'/organigramme'}>Organigramme</Link></li>
                <li><Link to={'/'}>Deconnexion</Link></li>
            </ul>
        </div>
    )
}
/*const photosCheck = () => {
    if (oneUser === null || oneUser.userPhoto === null) {
      return profilPhoto
    }
    return oneUser[0].image_profil
  }*/
const StyledHeader = styled.header`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   border: 1px solid black;
   background: #f15a22;
   color: white;
`

const imgStyle= {
    fontSize: '1rem',
    marginLeft: "10px"
}
const ulStyle= {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    listStyle: "none",
    gap: '1rem',
    cursor: 'pointer'
}
const liStyle = {
    border: '1px solid black',
    width: '35px',
    borderRadius: '100%',
    objectFit: 'contain',
    height: '35px',
    marginRight: '0.5rem',
    cursor: 'pointer',
    zIndex: '100'
}
const liStyleImg = {
    border: '1px solid black',
    width: '100%',
    borderRadius: '100%',
    objectFit: 'cover',
    height: '100%',
    cursor: 'pointer',
    zIndex: '100'
}
  return (
    <div>
    <DisplayHiddenMenu />
    <StyledHeader>
        <div>
            <h3 style={imgStyle}>Groupomania</h3>
        </div>
      <nav>
        <ul style={ulStyle}>
            <li><Link to={'/profil'}>Profil</Link></li>
            <li><Link to={'/publication'}>Accueil</Link></li>
            <li style={liStyle} onClick= {menuAppear}><img src={(oneUser === null || oneUser[0].image_profil === null) ? profilPhoto : oneUser[0].image_profil} alt="" style={liStyleImg} /></li>
        </ul>
      </nav>
    </StyledHeader>
    </div>
  )
}