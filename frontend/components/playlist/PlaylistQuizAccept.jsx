import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { useQuery, useMutation } from '@apollo/react-hooks';

import PagePadding from '../styled/blocks/PagePadding';
import TextButton from '../styled/elements/TextButton';
import ModalContext from '../context/ModalContext';
import { GET_QUIZ_FOR_PLAYLIST } from '../../gql/queries';

const ACCEPT_QUIZ_APPROVAL = gql`
  mutation ACCEPT_QUIZ_APPROVAL($requestId: ID!) {
    acceptQuizApproval(requestId: $requestId) {
      _id
    }
  }
`;

const MARK_QUIZ_COMPLETE = gql`
  mutation MARK_QUIZ_COMPLETE(
    $playlistId: ID!,
    $requestId: ID!,
  ) {
    createScore(playlistId: $playlistId) {
      _id
    }
    deleteRequest(requestId: $requestId)
  }
`;

const PlaylistQuizAccept = ({ playlistId, requestId }) => {
  const modal = useContext(ModalContext)
  const [inProgress, toggleInProgress] = useState(false);

  const { data: quizData } = useQuery(GET_QUIZ_FOR_PLAYLIST, {
    variables: { playlistId: playlistId }
  })
  const quizLink = quizData?.getQuizForPlaylist?.externalLink;

  const [acceptQuizApproval, { data: acceptData }] = useMutation(ACCEPT_QUIZ_APPROVAL);
  const [markQuizComplete, { data: completedData }] = useMutation(MARK_QUIZ_COMPLETE);

  const beginQuiz = () => {
    window.open(`http://${quizLink}`, '_blank');
    toggleInProgress(true);
    acceptQuizApproval({
      variables: { requestId: requestId }
    })
  }

  const endQuiz = () => {
    toggleInProgress(false);
    markQuizComplete({
      variables: {
        playlistId: playlistId,
        requestId: requestId,
      }
    })

    modal.close();
  }

  return (
    <PagePadding>
      <h4>Your Quiz Is Approved!</h4>
      <p>Your quiz will open in another window. Once you have completed it, return here and mark the quiz as complete to let your teacher know you're done!</p>
      {!inProgress ?
        <TextButton onClick={beginQuiz}>Begin Your Quiz</TextButton>
        :
        <TextButton onClick={endQuiz} css={css`background-color: var(--red);border-color: var(--red);`}>Complete Your Quiz</TextButton>
      }

    </PagePadding>
  );
};

PlaylistQuizAccept.propTypes = {
  playlistId: PropTypes.string.isRequired,
}

export default PlaylistQuizAccept;