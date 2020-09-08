import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types'
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { Draggable } from 'react-beautiful-dnd';

import playlistBoxAssessed from '../../styles/playlistBoxAssessed';

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

const spreadNameAndScore = css`
  display: flex;
  justify-content: space-between;
  .percent {
    color: rgba(0,0,0,0);
    text-shadow: none;
    transition: color 0.5s;
  }
  .percent:hover { 
    color: white;
    transition: color 0.5s;
  }
`;

const CoursePlaylistBox = ({ name, playlistId, index, best }) => {
  const { pathname } = useRouter();
  const path = pathname.startsWith('/teacher') ? '/teacher/manage' : '/student';
  const studentView = pathname.startsWith('/student');

  const assessedStyle = studentView ? playlistBoxAssessed(best) : null;

  return (
    <Draggable
      draggableId={playlistId}
      index={index}
      isDragDisabled={studentView}
    >
      {provided => (
        <div
          css={[styledBox, assessedStyle]}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Link href={`${path}/playlists/[playlistId]`} as={`${path}/playlists/${playlistId}`}>
            <div css={spreadNameAndScore} title={`${name}${best ? ` - ${best}%` : ''}`}>
              <span>{name}</span>
              {best && <span className='percent'>{best}%</span>}
            </div>
          </Link>
        </div>
      )}
    </Draggable>
  );
};

CoursePlaylistBox.propTypes = {
  name: PropTypes.string.isRequired,
  playlistId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default CoursePlaylistBox;