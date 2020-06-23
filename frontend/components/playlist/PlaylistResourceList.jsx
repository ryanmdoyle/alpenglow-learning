import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import PlaylistResourceListItem from './PlaylistResourceListItem';

const list = css`
list-style: none;
margin: 0;
padding: 0;
  li {
    min-height: 65px;
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    padding: 1rem 0.5rem;
    overflow: hidden;
    box-sizing: border-box;
    transition: box-shadow 0.15s;
    :hover {
      box-shadow: var(--shadowMedium);
      transition: box-shadow 0.15s;
    }
  }
  i {
    padding-left: 0.5rem;
    font-size: 2rem;
  }
  span, small {
    padding-left: 1rem;
  }
`;

const PlaylistResourceList = ({ resources }) => {
  return (
    <ul css={list}>
      {resources ?
        resources.map(resource => (
          <PlaylistResourceListItem resource={resource} key={resource._id} />
        ))
        : "This objective does not have any resources. (Yet!)"}
    </ul>
  );
};

PlaylistResourceList.propTypes = {
  resources: PropTypes.array,
}

export default PlaylistResourceList;