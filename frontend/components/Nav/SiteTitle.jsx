import React from 'react';
import { css } from '@emotion/core';

const mainContainer = css`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  
  .logo {
    display: flex;
    width: 60px;
    height: 75px;
    align-items: center;
    justify-content: center;
  }

  .title {
    height: 75px;
    width: 160px;
    padding-top: 0.7rem;
    h1 {
      font-size: 1.4rem;
      height: 1.4rem;
      color: var(--pink);
      margin:0;
      margin-left: 1rem;
    }
  }
`;

// const logo = css`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   /* h1 { margin: 2rem 0; } */
// `

// const title = css`
//   /* reset h1 size so site title is h1 while the other headers are h2 or less */
//   display: flex;
//   align-items: center;
//   h1 {
//     font-size: 1.4rem;
//     color: var(--pink);
//     margin-left: 1rem;
//   }
// `;

const SiteTitle = () => {
  return (
    <div css={mainContainer}>
      <div className='logo'>
        <img src='/alpenglow.svg' width='60px' />
      </div>
      <div className='title'>
        <h1>Alpenglow Learning</h1>
      </div>
    </div>
  );
};

export default SiteTitle;