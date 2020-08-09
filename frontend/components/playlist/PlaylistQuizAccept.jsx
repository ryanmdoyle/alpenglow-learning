import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { gql, useQuery, useMutation } from '@apollo/client';

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

const PlaylistQuizAccept = ({ playlistId, requestId, approvalAccepted }) => {
  const modal = useContext(ModalContext)

  const { data: quizData } = useQuery(GET_QUIZ_FOR_PLAYLIST, {
    variables: { playlistId: playlistId }
  })
  const quizLink = quizData?.getQuizForPlaylist?.externalLink;

  const [acceptQuizApproval, { data: acceptData }] = useMutation(ACCEPT_QUIZ_APPROVAL);
  const [markQuizComplete, { data: completedData }] = useMutation(MARK_QUIZ_COMPLETE);

  const beginQuiz = () => {
    window.open(`http://${quizLink}`, '_blank');
    acceptQuizApproval({
      variables: { requestId: requestId }
    })
  }

  const endQuiz = () => {
    markQuizComplete({
      variables: {
        playlistId: playlistId,
        requestId: requestId,
      }
    })
    modal.close();
  }

  return (
    <>
      {!approvalAccepted ?
        <TextButton onClick={beginQuiz} css={css`margin-left: 1rem;`}>Begin Your Quiz</TextButton>
        :
        <TextButton onClick={endQuiz} css={css`background-color: var(--red);border-color: var(--red);margin-left: 1rem;`}>Complete Your Quiz</TextButton>
      }
    </>
  );
};

PlaylistQuizAccept.propTypes = {
  playlistId: PropTypes.string.isRequired,
}

export default PlaylistQuizAccept;