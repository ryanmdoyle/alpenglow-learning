import React from 'react';
import { css } from '@emotion/core';

import PlaylistBox from './PlaylistBox';

const playlistsContainer = css`
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  display: flex;
`;

const courseContainer = css`
  box-sizing: border-box;
  width: calc( 100% - 2rem);
  margin: 1rem 1rem;
  padding: 1rem;
  border-radius: var(--borderRadius);
  transition: box-shadow 0.15s;
  
  h1, h2, h3, h4, h5, h6 {
    color: var(--blueDark);
  }
  h2  {margin: 0.2rem 0; }
  h3 { margin: 0.6rem 0; }

  :hover {
    box-shadow: var(--shadowMedium);
    transition: box-shadow 0.15s;
  }
`;

const CourseContainer = ({name}) => {
  return (
    <section css={courseContainer}>
        <h2>{name}</h2>
        <h3>Essential</h3>
        <div css={playlistsContainer}>
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
        </div>
        <h5 css={css`margin: 0.6rem 0;`}>Core</h5>
        <div css={playlistsContainer}>
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
        </div>
      </section>
  );
};

export default CourseContainer;