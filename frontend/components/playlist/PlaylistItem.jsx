import React from 'react';
import { css } from '@emotion/core';

const item = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 1rem;
  border: 1px solid rgba(0, 0, 0, 0);
  border-top: 1px solid var(--blueMedium);

  .playlist-buttons {
    display: flex;
    align-items: center;
    button { margin: 0 0.5rem; }
  }

  :hover {
    border: 1px solid var(--blueMedium);
    border-radius: 5px;
    box-shadow: var(--shadowMedium);
  }
  :hover + li {
    border-top: 1px solid rgba(0, 0, 0, 0);
  }
`;

const PlaylistItem = ({ name, _id }) => {
  return (
    <li css={item}>
      <p>{name}</p>
      <li className='playlist-buttons'>
        <button>Edit</button>
        <button>Remove</button>
      </li>
    </li>
  );
};

export default PlaylistItem;