import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import PlaylistRequestButton from './PlaylistRequestButton';
import PlaylistCreateQuizButton from './PlaylistCreateQuizButton';
import Header5Settings from '../styled/elements/Header5Settings';
import AlertContext from '../context/AlertContext';
import ModalContext from '../context/ModalContext';
import UpdatePlaylistDescriptionForm from '../forms/update/UpdatePlaylistDescriptionForm';

const PlaylistDetailsDescription = ({ playlistId, playlistDescription }) => {
  const { pathname } = useRouter();
  const studentView = pathname.startsWith('/student');
  const modal = useContext(ModalContext);
  const alert = useContext(AlertContext);

  const updateDescription = (id) => {
    modal.setChildComponent(<UpdatePlaylistDescriptionForm playlistId={id} />);
    modal.open();
  }

  return (
    <div className='flex-item'>
      <Header5Settings onClick={() => { updateDescription(playlistId) }}>Description</Header5Settings>
      <p>{playlistDescription}</p>
      {studentView && <PlaylistRequestButton playlistId={playlistId} />}
      {!studentView && <PlaylistCreateQuizButton playlistId={playlistId} />}
    </div>
  );
};

PlaylistDetailsDescription.propTypes = {
  playlistId: PropTypes.string.isRequired,
  playlistDescription: PropTypes.string.isRequired,
}

export default PlaylistDetailsDescription;