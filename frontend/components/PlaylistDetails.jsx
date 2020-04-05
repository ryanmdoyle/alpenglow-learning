import React from 'react';
import { css } from '@emotion/core';

const details = css`
  background-color: var(--blueLight);
  width: 100%;
  min-height: 200px;
  padding: 0 2rem;
  box-shadow: var(--shadowLight);

  display: flex;
  .flex-item {
    width: 50%;
    padding-right: 0.8rem;
  }
  .objectives { 
    padding-left: 1rem;
    border-left: 1px solid var(--blueMedium);
  }

  h2, h3 {
    color: var(--pink);
  }
`;

const PlaylistDetails = () => {
  return (
    <div css={details}>
      <div className='flex-item'>
        <h2>Playlist Title</h2>
        <p>Here are some details about the playlist that would be important.</p>
      </div>
      <div className='flex-item objectives'>
        <h3>Objectives</h3>
        <ol>
          <li>asd</li>
          <li>asd</li>
        </ol>
      </div>
    </div>
  );
};

export default PlaylistDetails;