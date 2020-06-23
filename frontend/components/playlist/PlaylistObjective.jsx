import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { DragDropContext } from 'react-beautiful-dnd';

import PlaylistResourceList from './PlaylistResourceList';
import TextButton from '../styled/elements/TextButton';
import ModalContext from '../context/ModalContext';
import AlertContext from '../context/AlertContext';
import CreateResource from '../forms/CreateResource';

const objectiveStyles = css`
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

const PlaylistObjective = ({ objectiveId, objectiveName, objectiveDescription, resources, playlistId }) => {
  const [resourceArr, setResourceArr] = useState(resources);
  const modal = useContext(ModalContext);
  const alert = useContext(AlertContext);
  const { pathname } = useRouter();
  const studentView = pathname.startsWith('/student');

  const addResourceModal = () => {
    modal.setChildComponent(
      <CreateResource
        objectiveName={objectiveName}
        objectiveId={objectiveId}
        playlistId={playlistId}
      />)
    modal.open();
  }

  const handleDrag = result => {
    const { source, destination } = result;
    const draggedItem = resourceArr[source.index];
    const newOrderArr = [...resourceArr];
    newOrderArr.splice(source.index, 1);
    newOrderArr.splice(destination.index, 0, draggedItem)
    setResourceArr([...newOrderArr]);
  }

  useEffect(() => {
    setResourceArr([...resources])
  }, [resources])

  return (
    <div css={objectiveStyles}>
      <a name={objectiveId}></a>
      <h4>{objectiveName}</h4>
      <small>{objectiveDescription}</small>
      <DragDropContext onDragEnd={handleDrag}>
        <PlaylistResourceList resources={resourceArr} objectiveId={objectiveId} />
      </DragDropContext>
      {!studentView && (
        <TextButton onClick={addResourceModal}>Add Resource</TextButton>
      )}
    </div>
  );
};

PlaylistObjective.propTypes = {
  playlistId: PropTypes.string.isRequired,
  objectiveId: PropTypes.string.isRequired,
  objectiveName: PropTypes.string.isRequired,
  objectiveDescription: PropTypes.string.isRequired,
  resources: PropTypes.array,
}

export default PlaylistObjective;