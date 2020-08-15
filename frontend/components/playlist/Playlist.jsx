import React, { useContext } from 'react';
import { css } from "@emotion/core";
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import Loading from '../../components/Loading';
import PageTitle from '../styled/PageTitle';
import PlaylistDetails from './PlaylistDetails';
import PagePadding from '../styled/PagePadding'
import PlaylistObjective from './PlaylistObjective';
import TextButton from '../styled/elements/TextButton';
import ModalContext from '../context/ModalContext';
import DeletePlaylistForm from '../forms/delete/DeletePlaylistForm';
import UpdatePlaylistForm from '../forms/update/UpdatePlaylistForm';
import PlaylistEdit from './PlaylistEdit';
import { GET_PLAYLIST } from '../../gql/queries';

const editButton = css`
  position: fixed; 
  right: 10px;
  bottom: 10px;
`;

const Playlist = ({ playlistId }) => {
  const { pathname } = useRouter();
  const studentView = pathname.startsWith('/student');
  const modal = useContext(ModalContext);

  const { loading, error, data } = useQuery(GET_PLAYLIST, {
    variables: { playlistId },
  })
  console.log('playlist data', data)

  const editPlaylist = () => {
    modal.setChildComponent(
      <PlaylistEdit
        playlistId={playlistId}
        playlistName={data.getPlaylist.name}
        playlistData={data.getPlaylist}
      />
    );
    modal.open();
  }

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
              playlistId={playlistId}
              objectiveId={obj._id}
              objectiveName={obj.name}
              objectiveDescription={obj.description}
              resources={obj.resources}
              key={obj._id}
            />
          ))
        )}
        {!studentView && <TextButton css={editButton} onClick={editPlaylist}>Edit Playlist</TextButton>}
      </PagePadding>
    </>
  );
};

export default Playlist;