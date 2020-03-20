import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/core';

const item = css`
  margin: 0.5rem 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--blueLight);
  border: 1px solid var(--blueLight);
  border-radius: var(--borderRadius);
  transition: background-color 0.2s, color 0.2s;

  a {
    margin: 0;
    color: var(--blueLight);
    transition: color 0.2s;
  }

  :hover {
    background-color: var(--blueLight);
    color: var(--blueDark);
    transition: background-color 0.2s, color 0.2s;
    a { 
      color: var(--blueDark); 
      transition: color 0.2s;
    }
  }
`;

const NavItem = ({ title, href }) => {
  return (
    <Link href={href}>
      <li css={item}>
        <a>{title}</a>
      </li>
    </Link>
  );
};

export default NavItem;