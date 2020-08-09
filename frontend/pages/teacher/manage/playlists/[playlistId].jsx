import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'

import PageFade from '../../../../components/styled/blocks/PageFade';
import Playlist from '../../../../components/playlist/Playlist';

const teacherPlaylistId = () => {
  const router = useRouter();
  const { playlistId } = router.query;

  return (
    <PageFade>
      <Head>
        <title>Alpenglow Learning - Manage Playlist</title>
        <meta name='description' content='Manage Playlist'></meta>
      </Head>
      <Playlist playlistId={playlistId} />
    </PageFade>
  );
};

export default teacherPlaylistId;