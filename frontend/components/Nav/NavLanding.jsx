import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/core';

import Login from './Login';

const a = css`
  margin: 0;
`;

const NavLanding = () => {
  return (
    <nav>
      <div css={css`display: flex;align-items:center;`}>
        <Link href='/'>
          <a css={a}>
            <img src='/alpenglow.svg' height='80px'></img>
          </a>
        </Link>
        <Link href='/'>
          <a css={a}>
            <h2>Alpenglow Learning</h2>
          </a>
        </Link>
      </div>
      <div css={css`display: flex;align-items:center;justify-self:flex-end;`}>
        <div css={css`margin-right: 1rem;text-align:right;`}>
          <Link href='/createAccount'>
            <a css={css`text-align:right;`}>Create Account</a>
          </Link>
        </div>
        <Login css={css`justify-self: flex-end;`} />
      </div>
    </nav >
  );
};

export default NavLanding;