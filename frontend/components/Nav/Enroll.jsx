import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import FormWrapper from '../styled/FormWrapper';
import AlertContext from '../context/AlertContext';

const item = css`
  margin: 0.5rem 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--blueLight);
  /* border: 1px solid var(--blueLight); */
  border-radius: var(--borderRadius);
  transition: background-color 0.2s, color 0.2s;

  p {
    margin: 0;
    color: var(--blueLight);
    transition: color 0.2s;
  }

  :hover {
    background-color: var(--blueLight);
    color: var(--blueDark);
    transition: background-color 0.2s, color 0.2s;
    p { 
      color: var(--blueDark); 
      transition: color 0.2s;
    }
  }
`;

const enrollForm = css`
  display: flex;
  flex-direction: row;
  margin-top: 0.7rem;
  
  input, button {
    height: 30px;
    padding: 0.2rem 1rem;
    background-color: var(--blueDark);
    color: var(--blueMedium);
    border: 1px solid var(--blueMedium);
    border-radius: 3px;
    :hover, :focus {
      border-color: var(--pink);
      color: var(--pink);
    }
  }

  input {
    width: 150px;
    margin-left: 1.5rem;
  }
  button {
    width: 50px;
    flex-grow: 1;
    margin: 0 1rem;
  }

  .hidden {
    height: 0px;
    opacity: 0;
    transition: height 0.8s, opacity 0.2s;
  }
  .shown {
    opacity: 1;
    height: 30px;
    transition: height 0.2s, opacity 0.8s;
  }
`;

const ENROLL_MUTATION = gql`
  mutation ENROLL($enrollId: String!) {
    enroll(enrollId: $enrollId) {
      _id
    }
  }
`;

const Enroll = () => {
  const [isAdding, setIsAdding] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const alert = useContext(AlertContext);
  const [enroll, { data }] = useMutation(ENROLL_MUTATION, {
    onCompleted: (data) => {
      alert.success(`Successfully enrolled in course!`)
    },
    onError: (data) => (alert.error(`Ooops, looks like there was a problem. ${data}`)),
  }
  )

  const onSubmit = data => {
    enroll({ variables: { enrollId: data.enrollId } });
    setIsAdding(false);
  }

  return (
    <>
      <div css={item} onClick={() => { setIsAdding(!isAdding) }}>
        <p>Add Course</p>
      </div>
      <form css={enrollForm} className={isAdding ? 'shown' : 'hidden'} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='Enter Enroll ID' name='enrollId' className={isAdding ? 'shown' : 'hidden'} ref={register({ required: true })}></input>
        <button type="submit" className={isAdding ? 'shown' : 'hidden'}>Add</button>
      </form>
    </>
  );
};

export default Enroll;