import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const buttonStyles = css`
  margin-top: 0.5rem;
  align-self: flex-end;
  height: 2.5rem;
  min-width: 6rem;
  max-width: 10rem;
  padding: 0 1rem;
  border-radius: 3px;
  border: 2px solid var(--blueMedium);
  color: white;
  background-color: var(--blueMedium);
  transition: color 0.15s, background-color 0.15s, border 0.15s;
  font-size: 0.8rem;
  :hover, :focus {
    border: 2px solid var(--pink);
    color: white;
    background-color: var(--pink);
    outline-color: var(--pink);
    transition: color 0.15s, background-color 0.15s, border 0.15s;
  }
`;

const TextButton = (props) => {
  const { children, onClick } = props;
  return (
    <button type='button' css={buttonStyles} onClick={() => onClick()} {...props}>
      {children}
    </button>
  );
};

TextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default TextButton;