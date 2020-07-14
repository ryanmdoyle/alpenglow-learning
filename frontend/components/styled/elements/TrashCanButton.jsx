import React from 'react';
import { css } from '@emotion/core';

const trash = css`
  :hover {
    color: var(--red);
  }
`;

const TrashCanButton = ({ onClick }) => {
  return (
    <i css={trash} className="material-icons delete" onClick={onClick}>delete</i>
  );
};

export default TrashCanButton;