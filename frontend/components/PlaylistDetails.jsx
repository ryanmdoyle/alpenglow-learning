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
    padding-bottom: 1rem;
  }
  .objectives { 
    padding-left: 1rem;
    padding-bottom: 1rem;
    border-left: 1px solid var(--blueMedium);
    ol { 
      padding-left: 1.5rem;
      margin-top: 1.3rem;
    }
    li {
      font-size: 0.9em;
    }
  }

  h4, h5 {
    color: var(--blueDark);
  }
  h5 {
    margin-top: calc(2.75rem + 7px);
  }
`;

const PlaylistDetails = ({ title, description }) => {
  return (
    <div css={details}>
      <div className='flex-item'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className='flex-item objectives'>
        <h5>Objectives</h5>
        <ol>
          <li>Solve single and multiple step equations from word problems.  step equations from word problems.  step equations from word problems.</li>
          <li>Solve single and multiple step equations from word problems.</li>
        </ol>
      </div>
    </div>
  );
};

export default PlaylistDetails;