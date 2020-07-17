import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { css } from '@emotion/core';

import TextButton from '../styled/elements/TextButton';
import PlaylistQuizAccept from './PlaylistQuizAccept';
import ModalContext from '../context/ModalContext';
import AlertContext from '../context/AlertContext';

const cancelButton = css`
  background-color: white;
  color: var(--blueMedium);
`;

const GET_PLAYLIST_REQUEST = gql`
  query GET_PLAYLIST_REQUEST(
    $playlistId: ID!,
  ) {
    getPlaylistRequest(playlistId: $playlistId) {
      _id
      approved
      approvalAccepted
    }
    getQuizForPlaylist(playlistId: $playlistId) {
      _id
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
  const alert = useContext(AlertContext);

  const { loading, error, data: requestData } = useQuery(GET_PLAYLIST_REQUEST, {
    variables: { playlistId: playlistId },
    pollInterval: 3000,
  });
  const requestId = requestData?.getPlaylistRequest?._id;
  const approvalAccepted = requestData?.getPlaylistRequest?.approvalAccepted;

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

  const isQuiz = requestData?.getQuizForPlaylist;
  const isRequested = requestData?.getPlaylistRequest ? true : false;
  const isApproved = isRequested && requestData?.getPlaylistRequest.approved;

  if (!isQuiz) return <em css={css`color: var(--pink);`}>Quiz has not been created for this playlist.</em>

  if (isApproved) {
    return (
      <>
        <TextButton onClick={cancelRequest} css={cancelButton}>Cancel Request</TextButton>
        <PlaylistQuizAccept playlistId={playlistId} requestId={requestId} approvalAccepted={approvalAccepted} />
      </>
    )
  }

  if (isRequested) {
    return (
      <>
        <TextButton onClick={cancelRequest} css={cancelButton}>Cancel Request</TextButton>
        <TextButton onClick={() => { alert.error("Quiz must be approved by instructor!", 3) }} css={css`margin-left: 1rem;`}>Wating on Approval...</TextButton>
      </>
    )
  }

  return (
    <>
      <TextButton onClick={requestQuiz}>Request Quiz</TextButton>
    </>
  );
};

export default PlaylistRequestButton;