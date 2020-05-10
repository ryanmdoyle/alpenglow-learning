import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const styledBox = css`
  margin-right: 3px;
  padding: 2px 8px;
  height: 100%;
  width: 100%;
  background-color: white;
  border: 1px solid var(--blueDark);
  border-radius: 2px;
  box-shadow: var(--shadowFlat);
  overflow: hidden;

  p {
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: var(--blueDark);
  }

  :hover {
    box-shadow: var(--shadowLight);
    border: 1px solid var(--blueDark);
  }
`;

const PlaylistBox = ({ name, playlistId, className }) => {
  return (
    <div css={styledBox} className={className} >
      <p>{name}</p>
    </div>
  );
};

export default PlaylistBox;