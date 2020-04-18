import React from 'react';
import { css } from '@emotion/core';

import PageTitle from '../../components/PageTitle';
import PagePadding from '../../components/styled/PagePadding';

const courseTitle = css`
  padding-bottom: 1rem;
  margin-bottom: 0;
`;

const playlist = css`
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

const teacherPlaylists = () => {
  return (
    <div>
      <PageTitle title='Playlists' />
      <PagePadding>
        <h3 css={courseTitle}>Course Something</h3>
        <ul css={css`padding: 0;`}>

          <li css={playlist}>
            <p>Playlist Title</p>
            <li className='playlist-buttons'>
              <button>Edit</button>
              <button>Remove</button>
            </li>
          </li>
          <li css={playlist}>
            <p>Playlist Title</p>
            <li className='playlist-buttons'>
              <button>Edit</button>
              <button>Remove</button>
            </li>
          </li>
          <li css={playlist}>
            <p>Playlist Title</p>
            <li className='playlist-buttons'>
              <button>Edit</button>
              <button>Remove</button>
            </li>
          </li>
          <li css={playlist}>
            <p>Playlist Title</p>
            <li className='playlist-buttons'>
              <button>Edit</button>
              <button>Remove</button>
            </li>
          </li>
        </ul>

      </PagePadding>
    </div>
  );
};

export default teacherPlaylists;