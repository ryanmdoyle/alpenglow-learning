import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import CoursePlaylistTimeline from './CoursePlaylistTimeline';
import Header4Settings from '../styled/elements/Header4Settings';
import AlertContext from '../context/AlertContext';
import ModalContext from '../context/ModalContext';
import UserContext from '../context/UserContext';
import UpdateCourseForm from '../forms/update/UpdateCourseForm';
import DeleteCourseForm from '../forms/delete/DeleteCourseForm';

const courseContainer = css`
  box-sizing: border-box;
  width: calc( 100% - 2rem);
  padding: 1rem;
  margin: 1rem 0 0 1rem;
  border-radius: var(--borderRadius);
  transition: box-shadow 0.15s;
  
  h4, h5 { 
    margin: 0.6rem 0;
  }
  h4 {
    margin-bottom: 1rem;
  }

  h5 {
    color: var(--blueMedium);
    :after {
      display: none;
    }
  }

  :hover {
    box-shadow: var(--shadowMedium);
    transition: box-shadow 0.15s;
  }
`;

const CourseTimelines = (props) => {
  const { name, essentialPlaylists, corePlaylists, challengePlaylists, courseId, subject, owner } = props;
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);
  const user = useContext(UserContext);

  const toggleCourseSettings = (courseId) => {
    modal.setChildComponent(
      <>
        <UpdateCourseForm courseId={courseId} />
        {(user._id == owner) && (
          <DeleteCourseForm courseId={courseId} courseName={name} />
        )}
      </>
    )
    modal.open();
  }

  return (
    // className prop is passed down for emotion css. passing {...props} throws error for other passed props
    <section css={courseContainer} className={props.className}>
      <Header4Settings onClick={() => { toggleCourseSettings(courseId) }}>{name}</Header4Settings>
      <CoursePlaylistTimeline courseId={courseId} subject={subject} type='Essential' playlists={essentialPlaylists} />
      <CoursePlaylistTimeline courseId={courseId} subject={subject} type='Core' playlists={corePlaylists} />
      <CoursePlaylistTimeline courseId={courseId} subject={subject} type='Challenge' playlists={challengePlaylists} />
    </section>
  );
};

CourseTimelines.propTypes = {
  name: PropTypes.string,
  essentialPlaylists: PropTypes.array,
  corePlaylists: PropTypes.array,
  challengePlaylists: PropTypes.array,
  courseId: PropTypes.string,
  subject: PropTypes.string,
}

export default CourseTimelines;