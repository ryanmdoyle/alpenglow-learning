import React from 'react';
import styled from '@emotion/styled';

const StyledForm = styled.div`
  form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  padding-bottom: 3rem;
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

  button[type=submit] {
    margin-top: 1.5rem;
    align-self: flex-end;
    height: 3rem;
    width: 10rem;
    border-radius: 3px;
    border: 1px solid var(--blueDark);
    color: var(--blueLight);
    background-color: var(--blueDark);
    transition: color 0.15s, background-color 0.15s;
    font-size: 0.8rem;
    :hover, :focus {
      border: 1px solid var(--blueDark);
      color: var(--blueDark);
      background-color: var(--pink50);
      transition: color 0.15s, background-color 0.15s;
    }
  }

`;

const FormWrapper = ({ children, onSubmit }) => {
  return (
    <StyledForm>
      {children}
    </StyledForm>
  );
};

export default FormWrapper;