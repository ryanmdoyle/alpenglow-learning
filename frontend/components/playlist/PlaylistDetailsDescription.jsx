import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import PlaylistRequestButton from './PlaylistRequestButton';
import PlaylistCreateQuizButton from './PlaylistCreateQuizButton';

const PlaylistDetailsDescription = ({ playlistId, playlistDescription }) => {
  const { pathname } = useRouter();
  const studentView = pathname.startsWith('/student');

  return (
    <div className='flex-item'>
      <h5>Description</h5>
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