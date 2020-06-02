import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

const progressContainer = css`
  height: 12px;
  width: 200px;
  border: 1px solid var(--blueDark);
  border-radius: 6px;
  overflow: hidden;
`;

const progressBar = css`
  height: 100%;
  width: 60%;
  background-color: var(--mint);
  display: flex;
  flex-direction: row-reverse;
`;

const completeProgress = css`
  height: 100%;
  width: 50%;
  background-color: var(--mint);
`;

const partialProgress = css`
  height: 100%;
  width: 40%;
  background-color: var(--yellowLight);
`;

const lowProgress = css`
  height: 100%;
  width: 10%;
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