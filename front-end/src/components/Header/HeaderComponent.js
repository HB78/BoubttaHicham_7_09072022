import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import './headerComponent.css';
import { Link } from "react-router-dom";

export default function Header() {

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
    fontSize: '1rem'
}
const ulStyle= {
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: "none",
    gap: '1rem',
    cursor: 'pointer'
}
const liStyle = {
    border: '1px solid black',
    width: '20px',
    borderRadius: '100%',
    objectFit: 'contain',
    height: '20px',
    marginRight: '0.5rem',
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
            <li style={liStyle} onClick= {menuAppear}></li>
        </ul>
      </nav>
    </StyledHeader>
    </div>
  )
}