import React from 'react';
import { css } from '@emotion/core';

const contentTitle = css`
  padding-bottom: 1rem;
  margin-bottom: 0;
`;

const ContentTitle = ({ children }) => {
  return (
    <div css={contentTitle}>
      {children}
    </div>
  );
};

export default ContentTitle;