import React from 'react';
import { css } from '@emotion/core';

const mainContainer = css`
  display: flex;
  padding: 0 1rem;
`;

const logo = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const title = css`
  h3 {
    font-size: 1.5rem;
    color: var(--pink);
  }
`;

const SiteTitle = () => {
  return (
    <div css={mainContainer}>
      <div css={logo}>
        <h3>🏔️</h3>
      </div>
      <div css={title}>
        <h3>Alpineglow Learning</h3>
      </div>
      
    </div>
  );
};

export default SiteTitle;