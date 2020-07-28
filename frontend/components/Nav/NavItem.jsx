import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

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

const NavItem = (props) => {
  const { children, href, as } = props;
  const router = useRouter();
  const isActiveLink = router.asPath === as ? [item, activeLink] : [item];

  return (
    <Link href={href} as={as}>
      <li css={isActiveLink} {...props}>
        <a>{children}</a>
      </li>
    </Link>
  );
};

NavItem.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  as: PropTypes.string.isRequired,
}

export default NavItem;