import React from 'react';
import { css } from '@emotion/core';

import ProgressBar from './ProgressBar';

const box = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const counter = css`
  color: var(--blueDark);
  font-size: 1rem;
`;

const ProgressBox_Course = ({ totalPlaylists, totalAttempts, completeAttempts, partialAttempts, lowAttempts }) => {
  return (
    <div css={box}>
      {/* <span css={counter}>12/34</span> */}
      <ProgressBar
        totalPlaylists={totalPlaylists}
        totalAttempts={totalAttempts}
        completeAttempts={completeAttempts}
        partialAttempts={partialAttempts}
        lowAttempts={lowAttempts}
      />
    </div>
  );
};

export default ProgressBox_Course;