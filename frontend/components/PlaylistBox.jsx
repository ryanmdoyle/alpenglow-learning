import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

// const styledBox = css`
//   margin-right: 3px;
//   padding: 2px 8px;
//   height: 100%;
//   width: 100%;
//   background-color: white;
//   border: 1px solid var(--grey);
//   border-radius: 2px;
//   box-shadow: var(--shadowLight);
//   p { margin: 0; }
//   :hover {
//     box-shadow: var(--shadowMedium);
//   }
// `;

const containerColors = props => {
  const { status } = props;
  switch (props.status) {
    case 'complete':
      return (
        css`
          background-color: var(--green);
          border: none;
          color: white;
        `
      )
      break;
    case 'past':
      return (
        css`
          background-color: var(--red);
          border: none;
          color: white;
        `
      )
      break;
    default:
      return (
        css`
          background-color: white;
          border: 1px solid var(--grey);
          color: black;
        `
      )
  }

}

const PlaylistContainer = styled.div`
  ${containerColors}
  margin-right: 3px;
  padding: 2px 8px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* background-color: white; */
  /* border: 1px solid var(--grey); */
  border-radius: 2px;
  box-shadow: var(--shadowLight);
  p {
    margin: 0;
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
  }
  :hover {
    box-shadow: var(--shadowMedium);
  }
`;


const PlaylistBox = (props) => {
  return (
    // <div css={styledBox} {...props}>
    //   <p>Some Playlist</p>
    // </div>
    <PlaylistContainer>
      <p>A Playlist</p>
    </PlaylistContainer>
  );
};

export default PlaylistBox;