import React from 'react';
import styled from 'styled-components';
import Loader from './../Loader/Loader';
import ProfilPost from './Profils/ProfilPost'
import ProfilCard from './Profils/profilCard/ProfilCard';
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
          <ProfilCard data={data} getPosts={getPosts}/>
          <DisplayPosts />
        </StyledPublicationPageProfil>
      <Footer />
      </>
        : <Loader />}
    </>
  )
}