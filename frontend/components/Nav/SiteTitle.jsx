import React from 'react';
import Link from 'next/link';
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

const SiteTitle = () => {
  return (
    <Link href='/'>
      <div css={mainContainer}>
        <div className='logo'>
          <img src='/alpenglow.svg' width='60px' alt='Alpenglow mountain logo' />
        </div>
        <div className='title'>
          <h1>Alpenglow Learning</h1>
        </div>
      </div>
    </Link>
  );
};

export default SiteTitle;