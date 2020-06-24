import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag'
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useMutation } from '@apollo/react-hooks';

import PlaylistNewObjectiveButton from './PlaylistNewObjectiveButton';
import AlertContext from '../context/AlertContext';
import { PLAYLIST_QUERY } from '../../gql/queries';

const UPDATE_OBJECTIVE_ORDER = gql`
  mutation UPDATE_OBJECTIVE_ORDER(
    $playlistId: String!,
    $source: Int!,
    $destination: Int!,
  ) {
    updateObjectiveOrder(
      playlistId: $playlistId,
      source: $source,
      destination: $destination,
    ) {
      _id
    }
  }
`;

const PlaylistDetailsObjectives = ({ objectives: queriedObjectives, playlistTitle, playlistId }) => {
  const alert = useContext(AlertContext);
  const { pathname } = useRouter();
  const studentView = pathname.startsWith('/student');

  const [objectives, setObjectives] = useState(queriedObjectives);
  useEffect(() => {
    setObjectives(queriedObjectives);
  }, [queriedObjectives]);

  const [updateOrder, { data }] = useMutation(UPDATE_OBJECTIVE_ORDER, {
    refetchQueries: [{ query: PLAYLIST_QUERY, variables: { playlistId: playlistId } }],
    onCompleted: (data) => {
      alert.success(`Successfully reordered objectives!`, 2)
    },
    onError: (data) => (alert.error(`Ooops, looks like there was a problem. ${data}`)),
  });

  const handleDrag = result => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const draggedItem = objectives[source.index];
    const newOrderArr = [...objectives];
    newOrderArr.splice(source.index, 1);
    newOrderArr.splice(destination.index, 0, draggedItem)
    setObjectives([...newOrderArr]);

    updateOrder({
      variables: {
        playlistId: playlistId,
        source: source.index,
        destination: destination.index,
      }
    })
  }

  const itemStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    padding: 0 0.25rem;
    border-radius: var(--borderRadius);
    :hover {
      box-shadow: var(--shadowMedium);
    }
  }
  `;

  return (
    <div className='flex-item objectives'>
      <h5>Objectives</h5>
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId={playlistId}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <ul css={itemStyle}>
                {objectives && objectives.map((objective, index) => (
                  <Draggable draggableId={objective._id} index={index} key={objective._id}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <li>
                          <a href={`#${objective._id}`}>
                            <strong>{objective.name}: </strong>
                          </a>
                          <br></br>
                          {objective.description}
                        </li>
                      </div>
                    )}
                  </Draggable>
                ))}
              </ul>
              {provided.placeholder}
            </div>
          )}

        </Droppable>
      </DragDropContext>
      {!studentView && <PlaylistNewObjectiveButton name={playlistTitle} playlistId={playlistId} />}
    </div>
  );
};

PlaylistDetailsObjectives.propTypes = {
  objectives: PropTypes.array.isRequired,
  playlistTitle: PropTypes.string.isRequired,
  playlistId: PropTypes.string.isRequired,
}

export default PlaylistDetailsObjectives;