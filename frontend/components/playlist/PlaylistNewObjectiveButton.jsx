import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { css } from '@emotion/core';

import PlusButtonWithText from '../styled/elements/PlusButtonWithText';
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
    <PlusButtonWithText onClick={() => { addObjective() }} css={css`padding-left: 0;padding-top: 0.5rem;`}>Add Objective</PlusButtonWithText>
  )
};

export default PlaylistNewObjectiveButton;