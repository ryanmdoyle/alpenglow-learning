import React from 'react';
import { css } from '@emotion/core';

import PlaylistBox from './PlaylistBox';
import PlaylistTypeTimeline from './PlaylistTypeTimeline';
import PlusButton from '../styled/elements/PlusButton';
import MinusButton from '../styled/elements/MinusButton';
import { PlaylistEnum } from '../../lib/enums';

const courseContainer = css`
  box-sizing: border-box;
  width: calc( 100% - 2rem);
  padding: 1rem;
  margin: 1rem 0 0 1rem;
  border-radius: var(--borderRadius);
  transition: box-shadow 0.15s;
  
  h1, h2, h3, h4, h5, h6 {
    color: var(--blueDark);
  }
  h2  {margin: 0.2rem 0; }
  h4, h5 { margin: 0.6rem 0; }
  h5 { color: var(--blueMedium);}

  :hover {
    box-shadow: var(--shadowMedium);
    transition: box-shadow 0.15s;
  }
`;

const CourseTimeline = ({ name, playlists }) => {
  const essential = playlists.filter(playlist => playlist.type === PlaylistEnum.Essential);
  const core = playlists.filter(playlist => playlist.type === PlaylistEnum.Core);
  const challenge = playlists.filter(playlist => playlist.type === PlaylistEnum.Challenge);

  return (
    <section css={courseContainer}>
      <h4>{name}</h4>
      <PlaylistTypeTimeline type='Essential' playlists={essential} />
      <PlaylistTypeTimeline type='Core' playlists={core} />
      <PlaylistTypeTimeline type='Challenge' playlists={challenge} />
    </section>
  );
};

export default CourseTimeline;