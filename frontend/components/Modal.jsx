import React, { useContext } from 'react';
import { css } from '@emotion/core';

import ModalContext from './context/ModalContext';
import CloseButton from './styled/elements/CloseButton';

const modalContainer = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-left: var(--navWidth);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--blueDark50);
  z-index: 101;
`;

const modal = css`
  position: relative;
  width: 80%;
  max-width: 800px;
  max-height: 90%;
  overflow: hidden;
  overflow-y: scroll;
  background-color: white;
  border-radius: var(--borderRadius);
  padding: 1rem;
  
  h4 { margin: 0; }

  .close {
    position: relative;
    top: 0;
    right: 0;
  }
`;


const Modal = () => {
  const modalCtx = useContext(ModalContext);

  const onClick = () => {
    if (event.target.className.endsWith('modalContainer')) {
      modalCtx.close();
    }
  }

  if (modalCtx.isOpen) { //modal context IS open
    return (
      <div css={modalContainer} onClick={onClick}>
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