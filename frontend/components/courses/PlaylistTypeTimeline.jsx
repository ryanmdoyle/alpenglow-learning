import React, { useContext } from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import PlaylistBox from './PlaylistBox';
import PlusButton from '../styled/elements/PlusButton';
import CreatePlaylistForm from '../forms/CreatePlaylistForm';
import ModalContext from '../context/ModalContext';

const playlistsContainer = css`
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  display: flex;
`;

const PlaylistTypeTimeline = ({ type, playlists, courseId, subject }) => {
  const modal = useContext(ModalContext);
  const router = useRouter();
  const studentView = router.pathname.startsWith('/student');

  const toggleModal = (courseData) => {
    modal.setChildComponent(
      <CreatePlaylistForm
        course={courseId}
        subject={subject}
        type={type}
      />
    )
    modal.open();
  }

  // If no playlists and not a student, show button to add playlist
  if (playlists.length == 0 && !studentView) return (
    <>
      <h5>{type}</h5>
      <div css={css`min-width: 3rem;display: flex;align-items:center;padding-left: 1rem;`}>
        <PlusButton onClick={toggleModal} />
        <p css={css`margin: 0;padding-left:0.5rem; color: var(--blueMedium);`}>Create a {type} playlist</p>
      </div>
    </>
  );

  // If there are playlists, show playlist type
  if (playlists.length > 0) return (
    <>
      <h5>{type}</h5>
      <div css={playlistsContainer}>
        {playlists.map(playlist => {
          return <PlaylistBox name={playlist.name} playlistId={playlist._id} key={playlist._id} />
        })}
        {!studentView && (
          <div css={css`min-width: 3rem;display: flex;align-items:center;`}>
            <PlusButton onClick={toggleModal} />
          </div>
        )}
      </div>
    </>
  );

  // if there are no playlists, return nothing
  return null;
};

PlaylistTypeTimeline.propTypes = {
  type: PropTypes.string,
  playlists: PropTypes.array,
  courseId: PropTypes.string,
  subject: PropTypes.string,
}

export default PlaylistTypeTimeline;