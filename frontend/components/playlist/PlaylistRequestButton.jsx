import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { css } from '@emotion/core';

import TextButton from '../styled/elements/TextButton';

const GET_PLAYLIST_REQUEST = gql`
  query GET_PLAYLIST_REQUEST(
    $playlistId: ID!,
  ) {
    getPlaylistRequest(
      playlistId: $playlistId,
    ) {
      approved
    }
  }
`;

const CREATE_REQUEST = gql`
  mutation CREATE_REQUEST(
    $playlistId: ID!,
  ) {
    createRequest(
      playlistId: $playlistId,
    ) {
      approved
      approvalAccepted
    }
  }
`;

const PlaylistRequestButton = ({ playlistId }) => {
  const { loading, error, data: queryData } = useQuery(GET_PLAYLIST_REQUEST, {
    variables: { playlistId: playlistId },
    pollInterval: 3000,
  });
  const [createRequest, { data }] = useMutation(CREATE_REQUEST, {
    refetchQueries: [{ query: GET_PLAYLIST_REQUEST, variables: { playlistId: playlistId } }],
  });

  const requestQuiz = () => {
    createRequest({
      variables: {
        playlistId: playlistId,
      }
    })
  }

  const isRequested = queryData?.getPlaylistRequest ? true : false;
  const isApproved = isRequested && queryData?.getPlaylistRequest.approved;

  if (isApproved) {
    return <TextButton onClick={() => console.log("Already requested!")}>Approved! Take Quiz</TextButton>
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