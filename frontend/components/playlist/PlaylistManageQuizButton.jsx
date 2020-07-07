import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import TextButton from '../styled/elements/TextButton';
import ModalContext from '../context/ModalContext';
import CreateQuizForm from '../forms/create/CreateQuizForm';
import UpdateQuizForm from '../forms/update/UpdateQuizForm';
import { GET_QUIZ_FOR_PLAYLIST } from '../../gql/queries';

const PlaylistManageQuizButton = ({ playlistId }) => {
  const { data, loading, error } = useQuery(GET_QUIZ_FOR_PLAYLIST, {
    variables: { playlistId: playlistId }
  })
  const modal = useContext(ModalContext);

  const createQuiz = () => {
    modal.setChildComponent(
      <CreateQuizForm playlistId={playlistId} />
    )
    modal.open();
  }

  const modifyQuiz = () => {
    modal.setChildComponent(
      <UpdateQuizForm playlistId={playlistId} />
    )
    modal.open();
  }
  if (data?.getQuizForPlaylist) {
    return (
      <TextButton onClick={() => { modifyQuiz() }}>Manage Quiz</TextButton>
    )
  }
  return (
    <TextButton onClick={() => { createQuiz() }}>Create Quiz</TextButton>
  )
};

export default PlaylistManageQuizButton;