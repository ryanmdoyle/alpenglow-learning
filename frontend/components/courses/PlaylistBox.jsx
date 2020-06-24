import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types'
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { Draggable } from 'react-beautiful-dnd';

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

const PlaylistBox = ({ name, playlistId, index }) => {
  const router = useRouter();
  const pathname = router.pathname.startsWith('/teacher') ? '/teacher/manage' : '/student';
  return (
    <Draggable
      draggableId={playlistId}
      index={index}
    >
      {provided => (
        <div
          css={styledBox}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Link href={`${pathname}/playlists/${playlistId}`}>
            <div>
              <span>{name}</span>
            </div>
          </Link>
        </div>
      )}
    </Draggable>
  );
};

PlaylistBox.propTypes = {
  name: PropTypes.string.isRequired,
  playlistId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default PlaylistBox;