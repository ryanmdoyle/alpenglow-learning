import React from 'react';
import { css } from '@emotion/core';

const end = css`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageEndPadding = () => {
  return (
    <div css={end}>
      <img src='/alpenglow.svg' width='20px' alt='Alpenglow mountain logo' />
    </div>
  );
};

export default PageEndPadding;