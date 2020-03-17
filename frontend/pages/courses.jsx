import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';


import PlaylistBox from '../components/PlaylistBox';
import PlaylistBox_Green from '../components/styled/PlaylistBox_Green';

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
  :hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    transition: box-shadow 0.15s;
  }
`;

// const past = theme => (`background-color: ${theme.past}`); //handle themes this way

const courses = () => {
  return (
    <content>
      <section css={courseContainer}>
        <h4 css={css`margin: 0.2rem 0;`}>Course Name</h4>
        <h5 css={css`margin: 0.6rem 0;`}>Essential</h5>
        <div css={playlistsContainer}>
          <PlaylistBox bg={'green'} />
          <PlaylistBox />
          <PlaylistBox_Green />
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
      <section css={courseContainer}>
        <h4 css={css`margin: 0.2rem 0;`}>Course Name</h4>
        <h5 css={css`margin: 0.6rem 0;`}>Essential</h5>
        <div css={playlistsContainer}>
          <PlaylistBox bg={'green'} />
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
        </div>
      </section>
    </content>
  );
};

export default courses;