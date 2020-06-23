import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import { css } from '@emotion/core';
import { useRouter } from 'next/router';

import PlaylistResourceList from './PlaylistResourceList';
import TextButton from '../styled/elements/TextButton';
import ModalContext from '../context/ModalContext';
import AlertContext from '../context/AlertContext';
import CreateResource from '../forms/CreateResource';

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

const PlaylistObjective = ({ id, name, description, resources, playlistId }) => {
  const modal = useContext(ModalContext);
  const alert = useContext(AlertContext);
  const { pathname } = useRouter();
  const studentView = pathname.startsWith('/student');

  const addResourceModal = () => {
    modal.setChildComponent(
      <CreateResource
        objectiveName={name}
        objectiveId={id}
        playlistId={playlistId}
      />)
    modal.open();
  }

  return (
    <div css={test}>
      <h4>{name}</h4>
      <small>{description}</small>
      <PlaylistResourceList resources={resources} />
      {!studentView && (
        <TextButton onClick={addResourceModal}>Add Resource</TextButton>
      )}
    </div>
  );
};

PlaylistObjective.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  resources: PropTypes.array,
  playlistId: PropTypes.string.isRequired,
}

export default PlaylistObjective;