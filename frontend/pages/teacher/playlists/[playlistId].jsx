import React from 'react';
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Playlist from '../../../components/playlist/Playlist';
import Loading from '../../../components/Loading';

const PLAYLIST_QUERY = gql`
  query PLAYLIST_QUERY(
    $playlistId: ID!
  ) {
    getPlaylist(playlistId: $playlistId) {
      _id
      name
      subject
      description
    }
  }
`;

const playlistId = () => {
  const router = useRouter();
  const { playlistId } = router.query;
  const { loading, error, data } = useQuery(PLAYLIST_QUERY, {
    variables: { playlistId },
  })

  if (error) return null;
  if (loading) return <Loading />
  return (
    <div>
      <Playlist playlistData={data.getPlaylist} />
    </div>
  );
};

export default playlistId;