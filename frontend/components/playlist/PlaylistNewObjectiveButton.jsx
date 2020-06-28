import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { css } from '@emotion/core';

import TextButton from '../styled/elements/TextButton';
import ModalContext from '../context/ModalContext';
import CreateObjectiveButtonForm from '../forms/create/CreateObjectiveButtonForm';
import { useContext } from 'react';

const PlaylistNewObjectiveButton = ({ playlistId, name }) => {
  const modal = useContext(ModalContext);

  const addObjective = () => {
    modal.setChildComponent(
      <CreateObjectiveButtonForm playlistId={playlistId} playlistName={name} />
    )
    modal.open();
  }

  return (
    <TextButton onClick={() => { addObjective() }}>Add Objective</TextButton>
  )
};

export default PlaylistNewObjectiveButton;