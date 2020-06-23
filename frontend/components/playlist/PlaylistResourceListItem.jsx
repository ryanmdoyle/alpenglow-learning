import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

const info = css`
  display: flex;
  flex-direction: column;
`;

const link = css`
  color: var(--blueDark);
  :visited {
    color: var(--blueMedium);
  }
`;

const PlaylistResourceListItem = ({ resource }) => {

  const icon = (type) => {
    switch (type) {
      case 'Article':
        return 'article'
        break;
      case 'Image':
        return 'image'
        break;
      case 'Practice':
        return 'create'
        break;
      case 'Video':
        return 'videocam'
        break;
      case 'Audio':
        return 'mic'
        break;
      default:
        return 'link';
    }
  }
  console.log(resource)

  return (
    <a href={`http://${resource.href}`} target="_blank" referrerpolicy='no-referrer' rel='external' css={link}>
      <li>
        <i className="material-icons">{icon(resource.type)}</i>
        <div css={info}>
          <span>{resource?.name}</span>
          <small>{resource?.description}</small>
        </div>
      </li>
    </a>
  );
};

PlaylistResourceListItem.propTypes = {
  resource: PropTypes.object.isRequired,
}

export default PlaylistResourceListItem;