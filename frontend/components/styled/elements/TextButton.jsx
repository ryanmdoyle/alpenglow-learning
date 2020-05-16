import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const buttonStyles = css`
  margin-top: 0.5rem;
  align-self: flex-end;
  height: 3rem;
  width: 10rem;
  border-radius: 3px;
  border: 2px solid var(--blueMedium);
  color: var(--blueMedium);
  background-color: white;
  transition: color 0.15s, background-color 0.15s;
  font-size: 0.8rem;
  :hover, :focus {
    border: 2px solid var(--blueMedoum);
    color: white;
    background-color: var(--blueMedium);
    transition: color 0.15s, background-color 0.15s;
  }
`;

const TextButton = ({ text, whenClicked }) => {
  return (
    <button type='button' css={buttonStyles} onClick={() => whenClicked()}>
      {text}
    </button>
  );
};

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  whenClicked: PropTypes.func,
}

export default TextButton;