import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Draggable } from 'react-beautiful-dnd';

const info = css`
  display: flex;
  flex-direction: column;
`;

const link = css`
  background-color: white;
  min-height: 20px;
  color: var(--blueDark);
  :visited {
    color: var(--blueMedium);
  }
`;

const PlaylistResourceListItem = ({ resource, index }) => {

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

  return (
    <Draggable draggableId={resource._id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <a
            href={`http://${resource.href}`}
            target="_blank"
            referrerPolicy='no-referrer'
            rel='external'
            css={link}
          >
            <li>
              <i className="material-icons icon">{icon(resource.type)}</i>
              <div css={info}>
                <span>{resource?.name}</span>
                <small>{resource?.description}</small>
              </div>
            </li>
          </a>
        </div>
      )}
    </Draggable>



  );
};

PlaylistResourceListItem.propTypes = {
  resource: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default PlaylistResourceListItem;