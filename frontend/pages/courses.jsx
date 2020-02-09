import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';


import PlaylistBox from '../components/PlaylistBox';

const playlistsContainer = css`
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  display: flex;
`;

const courseContainer = css`
  box-sizing: border-box;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 5px;
  transition: box-shadow 0.15s;
  :hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    transition: box-shadow 0.15s;
  }
`;


const courses = () => {
  return (
    <content>
      <section css={courseContainer}>
        <h2 css={css`margin: 0.2rem 0;`}>Course Name</h2>
        <p css={css`margin: 0.6rem 0;`}>Essential</p>
        <div css={playlistsContainer}>
          <PlaylistBox css={css`background-color: red;`} />
          <PlaylistBox css={css`background-color: white; border: 2px solid gray;`} />
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
        </div>
        <p css={css`margin: 0.6rem 0;`}>Core</p>
        <div css={playlistsContainer}>
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
          <PlaylistBox />
        </div>
      </section>
    </content>
  );
};

export default courses;