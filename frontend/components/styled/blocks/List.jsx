import React from 'react';
import { css } from '@emotion/core';

const listContainer = css`
  margin: 0;
  padding: 0;
  width: 100%;
`;

const row = css`
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: var(--borderRadius);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  :hover, :focus, :active {
    box-shadow: var(--shadowLight);
  }
  span { color: var(--blueDark);}
  small { color: var(--pink);}
  span:nth-child(n+2) {
    color: var(--blueDark50);
  }
`;

const ListContainer = ({ children }) => {
  return (
    <ul css={listContainer}>
      {children}
    </ul>
  )
}

const ListContainerOrdered = ({ children }) => {
  return (
    <ol css={listContainer}>
      {children}
    </ol>
  )
}

const ListRow = ({ children }) => {
  return (
    <li css={row}>
      {children}
    </li>
  );
};

export { ListContainer, ListContainerOrdered, ListRow }