import React from 'react';
import { css } from '@emotion/core';

const scoreContainer = css`
  width: 100%;
  padding: 0.5rem 0.5rem;
  border-radius: var(--borderRadius);
  display: flex;
  justify-content: space-between;
  transition: box-shadow 0.3s;
  overflow: hidden;
  :hover {
    box-shadow: var(--shadowMedium);
    transition: box-shadow 0.3s;
  }
  .score {
    max-height: 1.7rem;
    background-color: var(--green);
    border-radius: 2px;
    padding: 0 0.5rem;
  }
  .none {
    background-color: lightGray;
  }
`;

const scoreStyle = css`
    max-height: 1.7rem;
    background-color: var(--green);
    border-radius: 2px;
    padding: 0 0.5rem;
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
  return null
};

const GradesPlaylistScore = ({ name, percent, score, possibleScore }) => {
  const colorCoded = scoreColors(percent);

  return (
    <div css={scoreContainer}>
      <span>{name}</span>
      {
        percent ?
          <div css={[scoreStyle, colorCoded]}>{percent}%</div>
          :
          <div className='score none'>n/a</div>
      }
    </div>
  );
};

export default GradesPlaylistScore;