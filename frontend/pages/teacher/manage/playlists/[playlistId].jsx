import React from 'react';
import { useRouter } from 'next/router'

import Playlist from '../../../../components/playlist/Playlist';

const teacherPlaylistId = () => {
  const router = useRouter();
  const { playlistId } = router.query;

  return (
    <Playlist playlistId={playlistId} />
  );
};

export default teacherPlaylistId;