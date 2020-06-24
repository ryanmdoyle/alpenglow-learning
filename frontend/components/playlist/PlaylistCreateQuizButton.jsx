import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { css } from '@emotion/core';

import TextButton from '../styled/elements/TextButton';
import ModalContext from '../context/ModalContext';
import { useContext } from 'react';

const PlaylistCreateQuizButton = ({ playlistId }) => {
  const modal = useContext(ModalContext);

  const mangeQuiz = () => {
    modal.setChildComponent(
      <h4>Put CreateQuizForm here</h4>
    )
    modal.open();
  }

  return (
    <TextButton onClick={() => { mangeQuiz() }}>Manage Quiz</TextButton>
  )
};

export default PlaylistCreateQuizButton;