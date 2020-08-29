import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client';

import PageFade from '../../../components/styled/blocks/PageFade';
import Playlist from '../../../components/playlist/Playlist';
import Loading from '../../../components/Loading';
import { GET_ENROLLED_COURSES } from '../../../gql/queries';

const studentPlaylistId = () => {
  const router = useRouter();
  const { playlistId } = router.query;

  const { data, loading, error } = useQuery(GET_ENROLLED_COURSES);
  const ess = data?.getCoursesEnrolled?.map(course => course.essentialPlaylists.map(playlist => playlist._id))
  const core = data?.getCoursesEnrolled?.map(course => course.corePlaylists.map(playlist => playlist._id))
  const chall = data?.getCoursesEnrolled?.map(course => course.challengePlaylists.map(playlist => playlist._id))
  const playlists = data?.getCoursesEnrolled ? [...ess, ...core, ...chall].flat() : null;

  if (loading) return <Loading />
  if (!playlists.includes(playlistId)) {
    router.push('/student')
  }
  return (
    <PageFade>
      <Head>
        <title>Alpenglow Learning - Playlists</title>
        <meta name='description' content='Individual Playlist'></meta>
      </Head>
      <Playlist playlistId={playlistId} />
    </PageFade>
  );
};

export default studentPlaylistId;