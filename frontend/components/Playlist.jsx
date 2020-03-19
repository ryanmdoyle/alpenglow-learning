import React from 'react';
import { css } from "@emotion/core";

import PlaylistDetails from './PlaylistDetails';
import PlaylistObjective from './PlaylistObjective';

const Playlist = () => {
  return (
    <>
    <section id='playlist-details'>
      <PlaylistDetails />
    </section>
    <section id='playlist-objectives' css={css`padding: 0 2rem;`}>
      <PlaylistObjective />
      <PlaylistObjective />
    </section>
    </>
  );
};

export default Playlist;