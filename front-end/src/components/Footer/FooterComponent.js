import React from 'react';
import styled from 'styled-components';
import "./responsiveFooter.css";

export default function FooterComponent() {
    const StyledFooter = styled.footer`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   border: 1px solid black;
   background: #f15a22;
   color: white;
   font-size: 1rem;
`
  return (
    <StyledFooter>
         <p>GROUPOMANIA-Tous droits réservées</p>
    </StyledFooter>
  )
}
