import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'

import Playlist from '../../../components/playlist/Playlist';

const studentPlaylistId = () => {
  const router = useRouter();
  const { playlistId } = router.query;

  return (
    <>
      <Head>
        <title>Alpenglow Learning - Playlists</title>
        <meta name='description' content='Individual Playlist'></meta>
      </Head>
      <Playlist playlistId={playlistId} />
    </>
  );
};

export default studentPlaylistId;