import React from 'react';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'apollo-boost';

import Loading from '../../components/Loading';
import PageTitle from '../../components/PageTitle';
import PagePadding from '../../components/styled/PagePadding';
import PlaylistItem from '../../components/PlaylistItem';

const courseTitle = css`
  padding-bottom: 1rem;
  margin-bottom: 0;
`;

const teacherPlaylists = () => {
  const { loading, error, data } = useQuery(TEACHER_PLAYLISTS_QUERY);

  if (loading) return <Loading />
  return (
    <div>
      <PageTitle title='Playlists' />
      <PagePadding>
        {/* needs to  query courses, and playlists in courses */}
        <h3 css={courseTitle}>Course Something</h3>
        <ul css={css`padding: 0;`}>
          <PlaylistItem name='testing...' />
          <PlaylistItem name='testing...' />
        </ul>
        {/* finally query playlists with NO courses assigned */}
      </PagePadding>
    </div>
  );
};

export default teacherPlaylists;