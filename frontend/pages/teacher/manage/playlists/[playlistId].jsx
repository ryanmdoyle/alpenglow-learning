import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'

import Playlist from '../../../../components/playlist/Playlist';

const teacherPlaylistId = () => {
  const router = useRouter();
  const { playlistId } = router.query;

  return (
    <>
      <Head>
        <title>Alpenglow Learning - Manage Playlist</title>
        <meta name='description' content='Manage Playlist'></meta>
      </Head>
      <Playlist playlistId={playlistId} />
    </>
  );
};

export default teacherPlaylistId;