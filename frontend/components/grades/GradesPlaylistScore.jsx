import React from 'react';
import { css } from '@emotion/core';

import PercentScoreRectangle from '../styled/elements/PercentScoreRectangle';

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
    width: 3rem;
    max-height: 1.7rem;
    background-color: var(--green);
    border-radius: 2px;
    padding: 0 0.5rem;
    text-align: center;
  }
  .none {
    background-color: lightGray;
  }
`;

const GradesPlaylistScore = ({ name, percent, score, possibleScore }) => {

  return (
    <div css={scoreContainer}>
      <span>{name}</span>
      {
        percent ?
          <PercentScoreRectangle percent={percent} />
          :
          <div className='score none'>n/a</div>
      }
    </div>
  );
};

export default GradesPlaylistScore;