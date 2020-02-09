import React from 'react';
import { css } from '@emotion/core';

const styledBox = css`
  box-sizing: border-box;
  margin-right: 3px;
  padding: 2px 2px;
  height: 100%;
  width: 100%;
  background-color: green;
  border-radius: 2px;
  p {
    margin: 0;
  }
  :hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
`;

const PlaylistBox = (props) => {
  return (
    <div css={styledBox} {...props}>
      <p>Some Playlist</p>
    </div>
  );
};

export default PlaylistBox;