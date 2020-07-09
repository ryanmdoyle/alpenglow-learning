import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useRouter } from 'next/router';


import PlaylistResourceListItem from './PlaylistResourceListItem';

const list = css`
list-style: none;
margin: 0;
padding: 0;
`;

const PlaylistResourceList = ({ resources, objectiveId, playlistId }) => {
  const { pathname } = useRouter();
  const studentView = pathname.startsWith('/student');

  return (
    <Droppable droppableId={objectiveId} isDropDisabled={studentView} >
      {provided => (
        <ul
          css={list}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {resources &&
            resources.map((resource, index) => (
              <PlaylistResourceListItem resource={resource} key={resource._id} index={index} playlistId={playlistId} />
            ))
          }
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

PlaylistResourceList.propTypes = {
  resources: PropTypes.array,
}

export default PlaylistResourceList;