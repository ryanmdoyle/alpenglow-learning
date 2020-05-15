import React from 'react';
import { css } from '@emotion/core';

import PlaylistBox from './PlaylistBox';
import PlusButton from '../styled/elements/PlusButton';

const playlistsContainer = css`
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  display: flex;
`;

const playlistButton = css`
  font-size: 0.7rem;
  margin-left: 0.2rem;
  opacity: 1;
  :hover { opacity: 1;}
`;

const PlaylistTypeTimeline = ({ type, playlists }) => {
  if (playlists.length == 0) return null;
  return (
    <>
      <h5>{type}</h5>
      <div css={playlistsContainer}>
        {playlists.map(playlist => {
          return <PlaylistBox name={playlist.name} playlistId={playlist._id} key={playlist._id} />
        })}
        <div css={css`min-width: 3rem;display: flex;align-items:center;`}>
          <PlusButton css={playlistButton} />
        </div>
      </div>
    </>
  );
};

export default PlaylistTypeTimeline;