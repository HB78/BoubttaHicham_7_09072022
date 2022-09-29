import React from 'react';
import Loader from '../Loader/Loader';
import Publication from "./Publication/Publication";
import styled from 'styled-components';

//COMPOSANT qui va gérer la page publication dans son entiereté
//Dans la fonction display on fait un map sur le jsx de la carte representer par le cmpnt publication
//on remet posts en props pour pouvoir recuperer notament les id dans le component qui gere la card
//Dans le dernier return on fait un ternaire, si on a les résultats on les affiche grace au cmpt DisplayPost
//Si on ne les a pas on affiche le loader

export default function Publications({ posts }) {
  const StyledPublicationPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background:#ebdded;
  `
  function DisplayPosts() {
    return posts.map((post, index) => {
      return (
        <Publication key={index} data={post} />
      )
    });
  }

  return (
    //Si on a la data on creer une div avec le display a l'interieur cad la card sinon on lance le loader
    //La subtilité ici était de mettre le loader en dehors de la balise styled
    //sinon le loader etait soumis au css de la balise styled

    <>
      {posts.length > 0 ?
        <StyledPublicationPage className='publication'>
          <DisplayPosts />
        </StyledPublicationPage>
        : <Loader />}
    </>
  )
}
