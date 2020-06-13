import React from 'react';
import { css } from "@emotion/core";

import PageTitle from '../PageTitle';
import PlaylistDetails from './PlaylistDetails';
import PlaylistObjective from './PlaylistObjective';

const Playlist = ({ playlistData }) => {
  const { name, description, type, _id, objectives } = playlistData;
  return (
    <>
      <PageTitle subtitle={type} >{name}</PageTitle>
      <section id='playlist-details'>
        <PlaylistDetails title={name} description={description} id={_id} objectives={objectives} />
      </section>
      <section id='playlist-objectives' css={css`padding: 0 2rem;`}>
        {objectives && (
          objectives.map(obj => (
            <PlaylistObjective name={obj.name} description={obj.description} />
          ))
        )}
      </section>
    </>
  );
};

export default Playlist;