import React, { useContext } from 'react';
import { css } from '@emotion/core';


import TextButton from '../.../../../styled/elements/TextButton';
import ModalContext from '../../../components/context/ModalContext';
import ClassProgressPlaylistScores from './ClassProgressPlaylistScores';

const clipTitle = (text) => {
  const textArr = text.split('');
  if (textArr.length <= 25) {
    return text
  };
  const shortArr = [];
  textArr.forEach((char, index) => {
    if (index <= 24) shortArr.push(char);
  })
  const shortString = shortArr.join('');
  return shortString + '...';
}

const ClassProgressTableHeader = ({ playlistId, playlistName, students, scores }) => {
  const modal = useContext(ModalContext);

  const openScores = () => {
    modal.setChildComponent(<ClassProgressPlaylistScores playlistId={playlistId} playlistName={playlistName} students={students} scores={scores} />)
    modal.open()
  }

  return (
    <th key={playlistId}>
      <small title={name}>{clipTitle(name)}</small>
      <TextButton css={css`height: 25px; padding: 0 0.5rem;`} onClick={() => { openScores() }}>Enter Scores</TextButton>
    </th>
  );
};

export default ClassProgressTableHeader;