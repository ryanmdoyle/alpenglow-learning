import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const styledBox = css`
  margin-right: 3px;
  padding: 2px 8px;
  height: 100%;
  width: 100%;
  background-color: white;
  border: 1px solid var(--grey);
  border-radius: 2px;
  box-shadow: var(--shadowLight);
  p { margin: 0; }
  :hover {
    box-shadow: var(--shadowMedium);
  }
`;

const PlaylistBox = ({ className }) => {
  return (
    <div css={styledBox} className={className} >
      <p>A Playlist</p>
    </div>
  );
};

export default PlaylistBox;