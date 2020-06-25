import React, { useContext } from 'react';
import { css } from "@emotion/core";
import { useQuery } from '@apollo/react-hooks';

import Loading from '../../components/Loading';
import PageTitle from '../PageTitle';
import PlaylistDetails from './PlaylistDetails';
import PagePadding from '../styled/PagePadding'
import PlaylistObjective from './PlaylistObjective';
import TextButton from '../styled/elements/TextButton';
import AlertContext from '../context/AlertContext';
import ModalContext from '../context/ModalContext';
import DeletePlaylistForm from '../forms/DeletePlaylistForm';
import { PLAYLIST_QUERY } from '../../gql/queries';

const deleteButton = css`
  position: fixed; 
  right: 10px;
  bottom:10px; 
  background-color: var(--red);
  border-color: var(--red);
`

const Playlist = ({ playlistId }) => {
  const modal = useContext(ModalContext);
  const alert = useContext(AlertContext);
  const { loading, error, data } = useQuery(PLAYLIST_QUERY, {
    variables: { playlistId },
  })

  const deletePlaylist = () => {
    modal.setChildComponent(<DeletePlaylistForm playlistId={playlistId} playlistName={data.getPlaylist.name} />);
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
        <TextButton css={deleteButton} onClick={deletePlaylist}>Delete Playlist</TextButton>
      </PagePadding>
    </>
  );
};

export default Playlist;