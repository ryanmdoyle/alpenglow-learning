import React from 'react';
import { css } from '@emotion/core';

const StyledForm = css`
width: 100%;
display: flex;
justify-content: center;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 600px;
  }

  label {
    font-size: 1rem;
    color: var(--blueDark);
    margin-top: 1rem;
    text-transform: uppercase;
    font-weight: 600;
  }

  input, textarea, select {
    padding: 0.5rem;
    border: 1px solid var(--blueLight);
    font-size: 0.9rem;
    :hover, :active, :focus {
      border: 1px solid var(--blueMedium);
    }
  }

  input[type=radio] {
    align-self: flex-start;
  }

  textarea {
    font-family: 'Hind Madurai', sans-serif;
    font-weight: 400;
    line-height: 1.65;
    color: var(--blueDark);
  }

  select {
    height: 2.2rem;
  }

  small {
    color: var(--pink);
  }

  label > small {
    font-weight: 200;
    text-transform: lowercase;
  }

  button[type=submit] {
    margin-top: 1.5rem;
    align-self: flex-end;
    height: 3rem;
    width: 10rem;
    border-radius: 3px;
    border: 2px solid var(--blueMedium);
    color: var(--blueMedium);
    background-color: white;
    transition: color 0.15s, background-color 0.15s;
    font-size: 0.8rem;
    :hover:not(:disabled), :focus:not(:disabled) {
      border: 2px solid var(--blueMedoum);
      color: white;
      background-color: var(--blueMedium);
      transition: color 0.15s, background-color 0.15s;
    }
    :disabled {
      border: 1px solid lightgrey;
      background-color: lightgrey;
      color: var(--blueDark);
    }
  }
`;

const FormWrapper = (props) => {
  return (
    <div css={StyledForm} {...props}>
      {props.children}
    </div>
  );
};

export default FormWrapper;