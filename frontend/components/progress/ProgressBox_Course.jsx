import React from 'react';
import { css } from '@emotion/core';

import ProgressBar from './ProgressBar';

const box = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const counter = css`
  /* font-family: var(--headerFontFamily); */
  color: var(--blueDark);
  font-size: 1rem;
`;

const ProgressBox_Course = (props) => {
  return (
    <div css={box}>
      <span css={counter}>12/34</span>
      <ProgressBar
        totalPlaylists={20}
        totalAttempts={15}
        completeAttempts={9}
        partialAttempts={4}
        lowAttempts={2}
      />
    </div>
  );
};

export default ProgressBox_Course;