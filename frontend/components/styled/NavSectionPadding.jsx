import React from 'react';
import { css } from '@emotion/core';

const navSectionPad = css`
  padding: 0 1rem;
`;

const NavSectionPadding = ({ children }) => {
  return (
    <div css={navSectionPad}>
      {children}
    </div>
  );
};

export default NavSectionPadding;