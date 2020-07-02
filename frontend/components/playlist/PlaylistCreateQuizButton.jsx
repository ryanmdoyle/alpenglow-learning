import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { css } from '@emotion/core';

import TextButton from '../styled/elements/TextButton';
import ModalContext from '../context/ModalContext';
import CreateQuizForm from '../forms/create/CreateQuizForm';
import { useContext } from 'react';

const PlaylistCreateQuizButton = ({ playlistId }) => {
  const modal = useContext(ModalContext);
  const mangeQuiz = () => {
    modal.setChildComponent(
      <CreateQuizForm playlistId={playlistId} />
    )
    modal.open();
  }

  return (
    <TextButton onClick={() => { mangeQuiz() }}>Manage Quiz</TextButton>
  )
};

export default PlaylistCreateQuizButton;