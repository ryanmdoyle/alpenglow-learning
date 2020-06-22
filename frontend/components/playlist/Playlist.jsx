import React from 'react';
import { css } from "@emotion/core";
import { useQuery } from '@apollo/react-hooks';

import Loading from '../../components/Loading';
import PageTitle from '../PageTitle';
import PlaylistDetails from './PlaylistDetails';
import PagePadding from '../styled/PagePadding'
import PlaylistObjective from './PlaylistObjective';
import { PLAYLIST_QUERY } from '../../gql/queries';

const Playlist = ({ playlistId }) => {
  const { loading, error, data } = useQuery(PLAYLIST_QUERY, {
    variables: { playlistId },
  })
  console.log(data);
  // const { name, description, type, _id, objectives } = data ? data.getPlaylist : '';
  if (loading) return <Loading />
  return (
    <>
      <PageTitle subtitle={data.getPlaylist.type} >{data.getPlaylist.name}</PageTitle>
      <PlaylistDetails
        title={data.getPlaylist.name}
        description={data.getPlaylist.description}
        id={data.getPlaylist._id}
        objectives={data.getPlaylist.objectives}
      />
      <PagePadding>
        {data.getPlaylist.objectives && (
          data.getPlaylist.objectives.map(obj => (
            <PlaylistObjective
              id={obj._id}
              key={obj._id}
              name={obj.name}
              description={obj.description}
              resources={obj.resources}
            />
          ))
        )}
      </PagePadding>
    </>
  );
};

export default Playlist;