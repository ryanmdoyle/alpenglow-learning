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
  });
  const [createRequest, { data }] = useMutation(CREATE_REQUEST, {
    refetchQueries: [{ query: GET_PLAYLIST_REQUEST, variables: { playlistId: playlistId } }],
  });

  const createNewRequest = () => {
    createRequest({
      variables: {
        playlistId: playlistId,
      }
    })
  }

  return (
    <TextButton onClick={createNewRequest}>{!queryData?.getPlaylistRequest ? 'Request Assessment' : 'Awaiting Approval...'}</TextButton>
  );
};

export default PlaylistRequestButton;