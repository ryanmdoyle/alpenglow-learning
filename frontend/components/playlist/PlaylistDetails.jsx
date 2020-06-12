import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';

import TextButton from '../styled/elements/TextButton';
import PlaylistRequestButton from './PlaylistRequestButton';
import PlaylistCreateQuizButton from './PlaylistCreateQuizButton';

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

const PlaylistDetails = ({ title, description, id }) => {
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
          <li>Obj 1</li>
          <li>Obj 2</li>
          <li>Obj 3</li>
        </ol>
      </div>
    </div>
  );
};

export default PlaylistDetails;