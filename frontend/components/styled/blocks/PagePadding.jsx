import React from 'react';
import { css } from '@emotion/core';

const PagePaddingStyled = css`
  display: relative;
  padding: 0 2rem 3rem 2rem;
`;

const PagePadding = ({ children }) => {
  return (
    <div css={PagePaddingStyled}>
      {children}
    </div>
  );
};

export default PagePadding;