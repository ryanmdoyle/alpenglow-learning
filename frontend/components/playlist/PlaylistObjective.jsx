import React from 'react';
import PropTypes from 'prop-types'
import { css } from '@emotion/core';

import PlaylistResourceList from './PlaylistResourceList';

const test = css`
  h4 {
  position: relative;
  ::after {
      position: absolute;
      top: 79%;
      transform: skew(45deg);
      left: 0;
      width: 100%;
      height: 3px;
      background-color: var(--pink50);
      content: '';
      z-index: -100;
    }
  }
`;

const PlaylistObjective = ({ name, description }) => {
  return (
    <div css={test}>
      <h4>{name}</h4>
      <small>{description}</small>
      <PlaylistResourceList />
    </div>
  );
};

PlaylistObjective.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default PlaylistObjective;