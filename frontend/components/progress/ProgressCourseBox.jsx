import React from 'react';
import { css } from '@emotion/core';

import ProgressBar from './ProgressBar';

const box = css`
  position: relative;
  top: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  small {
    color: var(--green);
    position: relative;
    top: -4px;
  }
`;

const counter = css`
  color: var(--blueDark);
  font-size: 1rem;
`;

const ProgressCourseBox = ({ totalPlaylists, totalAttempts, completeAttempts, partialAttempts, lowAttempts }) => {
  return (
    <div css={box}>
      <ProgressBar
        totalPlaylists={totalPlaylists}
        totalAttempts={totalAttempts}
        completeAttempts={completeAttempts}
        partialAttempts={partialAttempts}
        lowAttempts={lowAttempts}
      />
      <small css={counter}>{completeAttempts}/{totalPlaylists}</small>
    </div>
  );
};

export default ProgressCourseBox;