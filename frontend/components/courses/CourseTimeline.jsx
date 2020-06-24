import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import PlaylistTypeTimeline from './PlaylistTypeTimeline';
import { PlaylistEnum } from '../../lib/enums';

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
    padding-bottom: 0.5rem;
    /* border-bottom: 1px solid var(--blueMedium50); */
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

const CourseTimeline = ({ name, essentialPlaylists, corePlaylists, challengePlaylists, courseId, subject }) => {

  return (
    <section css={courseContainer}>
      <h4>{name}</h4>
      <PlaylistTypeTimeline courseId={courseId} subject={subject} type='Essential' playlists={essentialPlaylists} />
      <PlaylistTypeTimeline courseId={courseId} subject={subject} type='Core' playlists={corePlaylists} />
      <PlaylistTypeTimeline courseId={courseId} subject={subject} type='Challenge' playlists={challengePlaylists} />
    </section>
  );
};

CourseTimeline.propTypes = {
  name: PropTypes.string,
  playlists: PropTypes.array,
  courseId: PropTypes.string,
  subject: PropTypes.string,
}

export default CourseTimeline;