import React from 'react';
import { css } from "@emotion/core";

import PlaylistDetails from './PlaylistDetails';
import PlaylistObjective from './PlaylistObjective';

const Playlist = ({ playlistData }) => {
  const { name, description } = playlistData;
  return (
    <>
      <section id='playlist-details'>
        <PlaylistDetails title={name} description={description} />
      </section>
      <section id='playlist-objectives' css={css`padding: 0 2rem;`}>
        <PlaylistObjective />
        <PlaylistObjective />
      </section>
    </>
  );
};

export default Playlist;