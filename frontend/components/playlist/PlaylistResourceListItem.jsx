import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

const info = css`
  display: flex;
  flex-direction: column;
`;

const PlaylistResourceListItem = ({ resource }) => {
  return (
    <li>
      {/* <img src='/article-40.png' /> */}
      <i className="material-icons">article</i>
      <div css={info}>
        <span>{resource?.name}</span>
        <small>{resource?.description}</small>
      </div>
    </li>
  );
};

PlaylistResourceListItem.propTypes = {
  resource: PropTypes.object.isRequired,
}

export default PlaylistResourceListItem;