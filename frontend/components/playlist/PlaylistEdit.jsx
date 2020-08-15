import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import { gql, useQuery } from '@apollo/client';

import UpdatePlaylistForm from '../forms/update/UpdatePlaylistForm';
import DeletePlaylistForm from '../forms/delete/DeletePlaylistForm';
import UserContext from '../context/UserContext';

const GET_PARENT_COURSE = gql`
  query GET_PARENT_COURSE($playlistId: ID!) {
    getCourseOfPlaylist(playlistId: $playlistId) {
      owner
    }
  }
`;

const PlaylistEdit = ({ playlistId, playlistName, playlistData }) => {
  const user = useContext(UserContext);
  const { data } = useQuery(GET_PARENT_COURSE, {
    variables: {
      playlistId: playlistId,
    }
  })

  return (
    <div>
      <UpdatePlaylistForm playlistData={playlistData} />
      {user._id === data?.getCourseOfPlaylist.owner && (
        <DeletePlaylistForm playlistId={playlistId} playlistName={playlistName} />
      )}
    </div>
  );
};

PlaylistEdit.propTypes = {
  playlistId: PropTypes.string.isRequired,
  playlistData: PropTypes.any.isRequired,
  playlistName: PropTypes.string.isRequired,
}

export default PlaylistEdit;