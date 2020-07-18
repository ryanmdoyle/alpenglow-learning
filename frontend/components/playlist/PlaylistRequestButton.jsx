import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { css } from '@emotion/core';

import TextButton from '../styled/elements/TextButton';
import PlaylistQuizAccept from './PlaylistQuizAccept';
import ModalContext from '../context/ModalContext';

const GET_PLAYLIST_REQUEST = gql`
  query GET_PLAYLIST_REQUEST(
    $playlistId: ID!,
  ) {
    getRequest(playlistId: $playlistId) {
      _id
      approved
    }
    getQuizForPlaylist(playlistId: $playlistId) {
      _id
      externalLink
      possibleScore
  }
  }
`;

const CREATE_REQUEST = gql`
  mutation CREATE_REQUEST($playlistId: ID!,) {
    createRequest(playlistId: $playlistId,) {
      approved
      approvalAccepted
    }
  }
`;

const CANCEL_REQUEST = gql`
  mutation CANCEL_REQUEST($requestId: ID!,) {
    deleteRequest(requestId: $requestId)
  }
`;

const PlaylistRequestButton = ({ playlistId }) => {
  const modal = useContext(ModalContext);

  const { loading, error, data: requestData } = useQuery(GET_PLAYLIST_REQUEST, {
    variables: { playlistId: playlistId },
    pollInterval: 3000,
  });
  const requestId = requestData?.getRequest?._id;

  const [createRequest, { data }] = useMutation(CREATE_REQUEST, {
    refetchQueries: [{ query: GET_PLAYLIST_REQUEST, variables: { playlistId: playlistId } }],
  });

  const [deleteRequest, { data: cancelData }] = useMutation(CANCEL_REQUEST, {
    refetchQueries: [{ query: GET_PLAYLIST_REQUEST, variables: { playlistId: playlistId } }],
  });

  const requestQuiz = () => {
    createRequest({
      variables: {
        playlistId: playlistId,
      }
    })
  }

  const cancelRequest = () => {
    deleteRequest({
      variables: {
        requestId: requestId,
      }
    })
  }

  const acceptQuiz = () => {
    modal.setChildComponent(<PlaylistQuizAccept playlistId={playlistId} requestId={requestId} />)
    modal.open();
  }

  const isQuiz = requestData?.getQuizForPlaylist;
  const isRequested = requestData?.getRequest ? true : false;
  const isApproved = isRequested && requestData?.getRequest.approved;

  if (!isQuiz) return <em css={css`color: var(--pink);`}>Quiz has not been created for this playlist.</em>

  if (isApproved) {
    return <TextButton onClick={acceptQuiz}>Approved! Take Quiz</TextButton>
  }

  if (isRequested) {
    return <TextButton
      onClick={cancelRequest}
      css={css`
        background-color: white;
        color: var(--blueMedium);
        :hover, :focus  {
          background-color: white;
          color: var(--blueMedium);
          border-color: var(--blueMedium);
        }
      `}
    >Cancel Request</TextButton>
  }

  return (
    <TextButton onClick={requestQuiz}>Request Quiz</TextButton>
  );
};

export default PlaylistRequestButton;