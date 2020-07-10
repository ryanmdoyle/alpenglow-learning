import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import PlaylistRequestButton from './PlaylistRequestButton';
import PlaylistManageQuizButton from './PlaylistManageQuizButton';
import Header5Settings from '../styled/elements/Header5Settings';
import ModalContext from '../context/ModalContext';
import UpdatePlaylistDescriptionForm from '../forms/update/UpdatePlaylistDescriptionForm';

const GET_SCORES_FOR_PLAYLIST = gql`
  query GET_SCORES_FOR_PLAYLIST($playlistId: ID!) {
    getScoresForPlaylist(playlistId: $playlistId) {
      _id
      score
      possibleScore
    }
  }
`;

const PlaylistDetailsDescription = ({ playlistId, playlistDescription }) => {
  const { pathname } = useRouter();
  const studentView = pathname.startsWith('/student');
  const modal = useContext(ModalContext);

  const { loading: scoreLoading, data: scoreData } = useQuery(GET_SCORES_FOR_PLAYLIST, {
    variables: { playlistId },
  })

  const updateDescription = () => {
    modal.setChildComponent(<UpdatePlaylistDescriptionForm playlistId={playlistId} />);
    modal.open();
  }

  const scores = []
  if (scoreData) { scoreData.getScoresForPlaylist.forEach(score => { scores.push(parseInt(score.score / score.possibleScore * 100)) }); }
  scores.sort((a, b) => b - a)

  return (
    <div className='flex-item'>
      <Header5Settings onClick={() => { updateDescription() }}>Description</Header5Settings>
      <p>{playlistDescription}</p>
      {(studentView && scores.length > 0) && <h5>Best Score: {`${scores[0]}%`}</h5>}
      {studentView && <PlaylistRequestButton playlistId={playlistId} />}
      {!studentView && <PlaylistManageQuizButton playlistId={playlistId} />}
    </div>
  );
};

PlaylistDetailsDescription.propTypes = {
  playlistId: PropTypes.string.isRequired,
  playlistDescription: PropTypes.string.isRequired,
}

export default PlaylistDetailsDescription;