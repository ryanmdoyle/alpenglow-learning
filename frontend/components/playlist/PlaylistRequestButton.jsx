import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { css } from '@emotion/core';

import TextButton from '../styled/elements/TextButton';
import PlaylistQuizAccept from './PlaylistQuizAccept';
import ModalContext from '../context/ModalContext';
import AlertContext from '../context/AlertContext';
import { GET_QUIZ_FOR_PLAYLIST } from '../../gql/queries';

const GET_PLAYLIST_REQUEST = gql`
  query GET_PLAYLIST_REQUEST(
    $playlistId: ID!,
  ) {
    getPlaylistRequest(
      playlistId: $playlistId,
    ) {
      _id
      approved
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
  mutation CANCEL_REQUEST($playlistId: ID!,) {
    deleteRequest(playlistId: $playlistId,) {
      _id
    }
  }
`;

const PlaylistRequestButton = ({ playlistId }) => {
  const modal = useContext(ModalContext);
  const alert = useContext(AlertContext);

  const { loading, error, data: queryData } = useQuery(GET_PLAYLIST_REQUEST, {
    variables: { playlistId: playlistId },
    pollInterval: 3000,
  });
  const requestId = queryData?.getPlaylistRequest?._id;

  const [createRequest, { data }] = useMutation(CREATE_REQUEST, {
    refetchQueries: [{ query: GET_PLAYLIST_REQUEST, variables: { playlistId: playlistId } }],
  });

  const [cancelRequest, { data: cancelData }] = useMutation(CANCEL_REQUEST, {
    refetchQueries: [{ query: GET_PLAYLIST_REQUEST, variables: { playlistId: playlistId } }],
  });

  const requestQuiz = () => {
    createRequest({
      variables: {
        playlistId: playlistId,
      }
    })
  }

  const acceptQuiz = () => {
    modal.setChildComponent(<PlaylistQuizAccept playlistId={playlistId} requestId={requestId} />)
    modal.open();
  }

  const isRequested = queryData?.getPlaylistRequest ? true : false;
  const isApproved = isRequested && queryData?.getPlaylistRequest.approved;

  if (isApproved) {
    return <TextButton onClick={acceptQuiz}>Approved! Take Quiz</TextButton>
  }

  if (isRequested) {
    return <TextButton
      onClick={() => console.log("Already requested!")}
      css={css`
        background-color: white;
        color: var(--blueMedium);
        :hover, :focus  {
          background-color: white;
          color: var(--blueMedium);
          border-color: var(--blueMedium);
        }
      `}
    >Awaiting Approval...</TextButton>
  }

  return (
    <TextButton onClick={requestQuiz}>Request Quiz</TextButton>
  );
};

export default PlaylistRequestButton;