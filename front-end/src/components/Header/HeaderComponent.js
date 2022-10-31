import React, { useContext } from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import './headerComponent.css';
import { Link } from "react-router-dom";
import profilPhoto from "./../../assets/profil.png";
import logo from "./../../assets/globe.gif"
import AuthContext from './../../auth/authContext'

export default function Header({ oneUser }) {
  console.log('oneUser:', oneUser)

  //composant qui va afficher le menu cacher au clic sur la photo
  const [menuVisible, setMenuVisible] = useState(false)
  const menuAppear = () => {
    setMenuVisible(!menuVisible)
  }

  const authcthx = useContext(AuthContext)

  function logOutSession() {
    authcthx.logout()
    alert("vous etes deconnecté")
  }
  function DisplayHiddenMenu() {
    return (
      <div className={menuVisible ? 'menu-box' : 'close-menu'}>
        <ul>
          <li><Link to={'/publication'}>Accueil</Link></li>
          <li><Link to={`/profil/${id}`}>Profil</Link></li>
          <li><Link to={'/organigramme'}>Organigramme</Link></li>
          <li onClick={logOutSession}><Link to={'/'}>Deconnexion</Link></li>
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
   border: 0px solid black;
   background: #f15a22;
   color: white;
`

  const entrepriseNameStyle = {
    fontSize: '1rem',
  }
  const ulStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    listStyle: "none",
    gap: '1rem',
    cursor: 'pointer'
  }
  const liStyle = {
    border: '0px solid black',
    width: '35px',
    borderRadius: '100%',
    objectFit: 'contain',
    height: '35px',
    marginRight: '0.8rem',
    cursor: 'pointer',
    zIndex: '100',
    transform: "scale(1.2)"
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
  const styleLogoHeader = {
    width: '2rem',
    marginLeft: "10px"
  }
  const styleFirstContaineInHeader = {
    display: 'flex',
    alignItems: 'center',
    gap: "1rem",
    fontSize: "1.2rem"
  }
  const id = localStorage.getItem("userId")
  return (
    <div>
      <DisplayHiddenMenu />
      <StyledHeader>
        <div style={styleFirstContaineInHeader}>
          <div style={styleLogoHeader}>
            <img src={logo} alt="" style={styleLogoHeader} />
          </div>
          <h3 style={entrepriseNameStyle}>Groupomania</h3>
        </div>
        <nav>
          <ul style={ulStyle}>
            <li><Link to={`/profil/${id}`}>Profil</Link></li>
            <li><Link to={'/publication'}>Accueil</Link></li>
            <li style={liStyle} onClick={menuAppear} className="menu_header"><img src={(oneUser === null || oneUser[0].image_profil === null) ? profilPhoto : oneUser[0].image_profil} alt="" style={liStyleImg} /></li>
          </ul>
        </nav>
      </StyledHeader>
    </div>
  )
}