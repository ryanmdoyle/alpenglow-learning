import React from 'react';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'apollo-boost';

import Loading from '../../../../components/Loading';
import PageTitle from '../../../../components/styled/PageTitle';
import PagePadding from '../../../../components/styled/blocks/PagePadding';
import PlaylistItem from '../../../../components/playlist/PlaylistItem';

const courseTitle = css`
  padding-bottom: 1rem;
  margin-bottom: 0;
`;

const teacherPlaylists = () => {

  return (
    <div>
      <h3>all playlists</h3>
    </div>
  );
};

export default teacherPlaylists;