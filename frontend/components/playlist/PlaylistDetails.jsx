import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';

import PlaylistRequestButton from './PlaylistRequestButton';
import PlaylistCreateQuizButton from './PlaylistCreateQuizButton';
import PlaylistNewObjectiveButton from './PlaylistNewObjectiveButton';
import { PLAYLIST_QUERY } from '../../pages/'

const details = css`
  width: 100%;
  padding: 0 2rem;
  display: flex;
  
  h5 {
    color: var(--blueDark);
    margin-top: calc(2.75rem + 7px);
    margin: 2rem 0 1rem;
  }

  p {
    font-size: 0.9em;
  }
  .flex-item {
    width: 50%;
    padding-right: 0.8rem;
  }

  .objectives { 
    padding-left: 1rem;
    ol { 
      padding-left: 1.5rem;
    }
    li {
      font-size: 0.9em;
    }
  }

`;

const PlaylistDetails = ({ title, description, id, objectives }) => {
  const { pathname } = useRouter();
  const studentView = pathname.startsWith('/student');

  return (
    <div css={details}>
      <div className='flex-item'>
        <h5>Description</h5>
        <p>{description}</p>
        {studentView && <PlaylistRequestButton playlistId={id} />}
        {!studentView && <PlaylistCreateQuizButton playlistId={id} />}
      </div>
      <div className='flex-item objectives'>
        <h5>Objectives</h5>
        <ol>
          {objectives && objectives.map(objective => (
            <li key={objective._id}><strong>{objective.name}: </strong><br></br>{objective.description}</li>
          ))}
        </ol>
        {!studentView && <PlaylistNewObjectiveButton name={title} playlistId={id} />}
      </div>
    </div>
  );
};

export default PlaylistDetails;