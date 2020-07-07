import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import PagePadding from '../styled/blocks/PagePadding';
import TextButton from '../styled/elements/TextButton';
import { GET_QUIZ_FOR_PLAYLIST } from '../../gql/queries';

const PlaylistQuizAccept = ({ playlistId }) => {
  const { data: quizData } = useQuery(GET_QUIZ_FOR_PLAYLIST, {
    variables: { playlistId: playlistId }
  })
  const quizLink = quizData?.getQuizForPlaylist?.externalLink;
  const openQuiz = () => {
    window.open(`http://${quizLink}`, '_blank');
  }
  return (
    <PagePadding>
      <h4>Your Quiz Is Approved!</h4>
      <TextButton onClick={openQuiz}>Begin Your Quiz</TextButton>
    </PagePadding>
  );
};

PlaylistQuizAccept.propTypes = {
  playlistId: PropTypes.string.isRequired,
}

export default PlaylistQuizAccept;