import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

const progressContainer = css`
  height: 1rem;
  width: 80%;
  min-width: 100px;
  border: 1px solid var(--blueDark50);
  border-radius: 6px;
  overflow: hidden;
`;

// progress of all attempts
const progressBar = css`
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

const completeProgress = css`
  height: 100%;
  background-color: var(--green);
`;

const partialProgress = css`
  height: 100%;
  background-color: var(--yellow);
`;

const lowProgress = css`
  height: 100%;
  background-color: var(--red);
`;

const ProgressBar = ({
  totalPlaylists,
  totalAttempts,
  completeAttempts,
  partialAttempts,
  lowAttempts,
}) => {
  const progressWidth = css`width: ${totalAttempts / totalPlaylists * 100}%;`
  const completeWidth = css`width: ${completeAttempts / totalAttempts * 100}%;`
  const partialWidth = css`width: ${partialAttempts / totalAttempts * 100}%;`
  const lowWidth = css`width: ${lowAttempts / totalAttempts * 100}%;`
  return (
    <div css={progressContainer}>
      <div css={[progressBar, progressWidth]}>
        <div css={[lowProgress, lowWidth]}></div>
        <div css={[partialProgress, partialWidth]}></div>
        <div css={[completeProgress, completeWidth]}></div>
      </div>
    </div>
  );
};

ProgressBar.defaultProps = {
  totalPlaylists: 0,
  totalAttempts: 0,
  completeAttempts: 0,
  partialAttempts: 0,
  lowAttempts: 0,
}

ProgressBar.propTypes = {
  totalPlaylists: PropTypes.number.isRequired,
  totalAttempts: PropTypes.number.isRequired,
  completeAttempts: PropTypes.number.isRequired,
  partialAttempts: PropTypes.number.isRequired,
  lowAttempts: PropTypes.number.isRequired,
}

export default ProgressBar;