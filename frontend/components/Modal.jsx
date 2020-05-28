import React, { useContext } from 'react';
import { css } from '@emotion/core';

import ModalContext from './context/ModalContext';
import CloseButton from './styled/elements/CloseButton';

const modalContainer = css`
  position: fixed;
  top: 0;
  left: var(--navWidth);
  width: calc(100% - var(--navWidth));
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--blueDark50);
`;

const modal = css`
  position: relative;
  width: 60%;
  background-color: white;
  border-radius: var(--borderRadius);
  box-shadow: var(--shadowHeavy);
  padding: 1rem;

  .close {
    position: relative;
    top: 0;
    right: 0;
    padding: 1rem;
  }
  
`;


const Modal = () => {
  const modalCtx = useContext(ModalContext);

  if (modalCtx.isOpen) { //modal context IS open
    return (
      <div css={modalContainer}>
        <div css={modal}>
          <div className='close'>
            <CloseButton onClick={() => { modalCtx.close() }} />
          </div>
          {modalCtx.childComponent}
        </div>
      </div>
    )
  } else { // modal context is NOT Open
    return null;
  };
};

export default Modal;