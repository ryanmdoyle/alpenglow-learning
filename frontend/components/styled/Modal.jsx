import React from 'react';
import { css } from '@emotion/core';

const modal = css`
  position: fixed;
  background-color: var(--pink);
  width: 100%;
  height: 100%;
`;


const Modal = ({ children }) => {
  return (
    <div css={modal}>
      {children}
    </div>
  );
};

export default Modal;