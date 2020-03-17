import React from 'react';
import { css } from '@emotion/core';

const item = css`
  margin: 0.5rem 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--blueLight);
  border: 1px solid var(--blueLight);
  border-radius: var(--borderRadius);
`;

const NavItem = ({title}) => {
  return (
    <li css={item}>
      <p>{title}</p>
    </li>
  );
};

export default NavItem;