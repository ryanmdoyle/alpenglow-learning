import React from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

const styledBox = css`
  margin-right: 3px;
  padding: 2px 8px;
  height: 100%;
  width: 100%;
  background-color: white;
  border: 1px solid var(--blueMedium);
  border-radius: 2px;
  box-shadow: var(--shadowFlat);
  overflow: hidden;
  transition: border 0.3s, background-color 0.3s;

  span {
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: var(--blueMedium);
    transition: color 0.3s;
  }

  :hover {
    box-shadow: var(--shadowLight);
    border: 1px solid var(--blueMedium);
    background-color: var(--blueMedium);
    span { color: white; }
  }
`;

const PlaylistBox = ({ name, playlistId, className }) => {
  const router = useRouter();
  const pathname = router.pathname.startsWith('/teacher') ? '/teacher/manage' : '/student';
  return (
    <Link href={`${pathname}/playlists/${playlistId}`}>
      <div css={styledBox} className={className} >
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default PlaylistBox;