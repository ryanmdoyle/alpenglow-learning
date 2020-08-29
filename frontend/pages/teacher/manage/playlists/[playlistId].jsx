import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import PageFade from '../../../../components/styled/blocks/PageFade';
import Playlist from '../../../../components/playlist/Playlist';
import Loading from '../../../../components/Loading';
import { GET_INSTRUCTING_COURSES } from '../../../../gql/queries';

const teacherPlaylistId = () => {
  const router = useRouter();
  const { playlistId } = router.query;

  const { data, loading, error } = useQuery(GET_INSTRUCTING_COURSES);
  const ess = data?.getCoursesInstructing.map(course => course.essentialPlaylists.map(playlist => playlist._id))
  const core = data?.getCoursesInstructing.map(course => course.corePlaylists.map(playlist => playlist._id))
  const chall = data?.getCoursesInstructing.map(course => course.challengePlaylists.map(playlist => playlist._id))
  const playlists = data?.getCoursesInstructing ? [...ess, ...core, ...chall].flat() : null;

  if (loading) return <Loading />
  if (!playlists.includes(playlistId)) {
    router.push('/teacher')
  }
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