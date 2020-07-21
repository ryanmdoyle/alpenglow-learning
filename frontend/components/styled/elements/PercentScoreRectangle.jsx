import React from 'react';

import { css } from '@emotion/core';

const scoreStyle = css`
  width: 3.5rem;
  max-height: 1.7rem;
  background-color: var(--green);
  border-radius: 2px;
  padding: 0 0.5rem;
  text-align: center;
`;

const scoreColors = (score) => {
  if (score >= 80) {
    return css`
      background-color: var(--green);
    `
  }

  if (score >= 70) {
    return css`
      background-color: var(--yellow);
    `
  }

  if (score !== null && score >= 0) {
    return css`
      background-color: var(--red);
    `
  }
  return css`background-color: lightGray;`
};

const PercentScoreRectangle = ({ percent }) => {
  const scoreColorCoded = scoreColors(percent);

  return (
    <div css={[scoreStyle, scoreColorCoded]}>
      {percent ?
        `${percent.toFixed(0)}%`
        :
        '-'
      }
    </div>
  );
};

export default PercentScoreRectangle;