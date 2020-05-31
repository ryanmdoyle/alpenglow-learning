import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/core';

const item = css`
  padding: 0.5rem 1rem;
  color: var(--blueLight);
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

const activeLink = css`
  background-color: var(--blueLight);
    color: var(--blueDark);
    transition: background-color 0.2s, color 0.2s;
    a { 
      color: var(--blueDark); 
      transition: color 0.2s;
    }
`;

const NavItem = ({ title, href }) => {
  const router = useRouter();
  const linkWithoutQuery = (router) => {
    if (Object.keys(router.query).length !== 0) {
      // remove query from pathname
      // get query key, get length (with []), returns beginning of string - key and the ending / in path name
      const queryKey = Object.keys(router.query)[0];
      const queryLength = queryKey.length + 2;
      return router.pathname.substr(0, (router.pathname.length - queryLength - 1))
    } else {
      return router.pathname;
    }
  }

  const pathnameNoQuery = linkWithoutQuery(router);

  const isActiveLink = pathnameNoQuery.includes(href) ? [item, activeLink] : [item];
  return (
    <Link href={href}>
      <li css={isActiveLink}>
        <a>{title}</a>
      </li>
    </Link>
  );
};

export default NavItem;