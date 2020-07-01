import React from 'react';
import { css } from '@emotion/core';

import PlusButton from './PlusButton';

const style = css`
  min-width: 3rem;
  display: flex;
  align-items:center;
  padding-left: 1rem;
  p {
    margin: 0;
    padding-left:0.5rem;
    color: var(--blueMedium);
  }
`;

const PlusButtonWithText = ({ children, onClick, ...props }) => {
  return (
    <div css={style} onClick={onClick} {...props}>
      <PlusButton />
      <p>{children}</p>
    </div>
  )
};

export default PlusButtonWithText;