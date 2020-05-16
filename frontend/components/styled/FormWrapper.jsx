import React from 'react';
import styled from '@emotion/styled';

const StyledForm = styled.div`
width: 100%;
display: flex;
justify-content: center;

  form {
    width: 100%;
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

  select {
    height: 2.2rem;
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
    :hover, :focus {
      border: 2px solid var(--blueMedoum);
      color: white;
      background-color: var(--blueMedium);
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