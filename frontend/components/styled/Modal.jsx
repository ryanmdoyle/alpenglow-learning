import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

import CloseButton from '../styled/elements/CloseButton';

const modalContainer = css`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--blueDark50);
`;

const modal = css`
  position: relative;
  height: 80%;
  width: 80%;
  background-color: white;
  border-radius: var(--borderRadius);
  box-shadow: var(--shadowHeavy);
  padding: 1rem;

  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
  }
  
`;


const Modal = ({ children, isOpen, toggle }) => {

  return (
    <div css={modalContainer}>
      <div css={modal}>
        <div className='close'>
          <CloseButton onClick={() => { toggle(!isOpen) }} />
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default Modal;