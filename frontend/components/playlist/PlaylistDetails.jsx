import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';

import PlaylistDetailsDescription from './PlaylistDetailsDescription';
import PlaylistDetailsObjectives from './PlaylistDetailsObjectives';

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
      strong { color: var(--blueMedium); }
    }
  }

`;

const PlaylistDetails = ({ title, description, id, objectives }) => {
  const { pathname } = useRouter();
  const studentView = pathname.startsWith('/student');

  return (
    <div css={details}>
      <PlaylistDetailsDescription
        playlistId={id}
        playlistDescription={description}
      />
      <PlaylistDetailsObjectives
        playlistId={id}
        playlistTitle={title}
        objectives={objectives}
      />
    </div>
  );
};

export default PlaylistDetails;