import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';

import TextButton from '../styled/elements/TextButton';
import AlertContext from '../context/AlertContext';
import { GET_PENDING_SCORES } from '../../pages/teacher/progress/grading';

const pendingScoreStyle = css`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p { margin: 0; }
  small { color: var(--pink);}
  input {
    width: 100px;
    margin-left: 1rem;
    height: 2rem;
    border: 1px solid var(--blueMedium);
    border-radius: 3px;
    padding: 0 1rem;
  }
  input[type=submit] {
    padding: 0 1rem;
    color: white;
    background-color: var(--blueMedium);
  }
  input[type=submit]:hover {
    background-color: var(--pink);
    border-color: var(--pink);
  }

  :hover {
    box-shadow: var(--shadowMedium);
    border-radius: var(--borderRadius);
  }
  .studentInfo {
    height: 100%;
    width: 20%;
  }
  .scoreEntry {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 80%;
    overflow: hidden;
    form {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
      .inputContainer {
        display: flex;
        flex-direction: column;
        position: relative;
        top: -13px;
      }
      small { 
        margin-left: 1rem;
        position: relative;
        top: 5px;
      }
    }

  }
`;

const UPDATE_SCORE = gql`
  mutation UPDATE_SCORE(
    $scoreId: ID!,
    $score: Int!,
    $possibleScore: Int!,
  ) {
    updateScore(
      scoreId: $scoreId,
      score: $score,
      possibleScore: $possibleScore,
    ) {
      _id
    }
  }
`;

const ProgressScoreEntry = ({ scoreId, studentName, playlistName, score, possibleScore }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);

  const [update, { data: updateData }] = useMutation(UPDATE_SCORE, {
    onCompleted: () => { alert.success('Successfully saved score!', 2) },
    refetchQueries: [{ query: GET_PENDING_SCORES }]
  });

  const onSubmit = data => {
    update({
      variables: {
        scoreId: scoreId,
        score: parseInt(data.score),
        possibleScore: parseInt(data.possibleScore),
      }
    })
  }
  return (
    <div css={pendingScoreStyle}>
      <div className='studentInfo'>
        <p>{studentName}</p>
        <small>{playlistName}</small>
      </div>
      <div className='scoreEntry'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='inputContainer'>
            <label htmlFor='score'><small>Score</small></label>
            <input type='number' min='0' name='score' ref={register({ required: true, min: 0 })} />
            {errors.score && 'Score must be a numerical value'}
          </div>
          <div className='inputContainer'>
            <label htmlFor='possibleScore'><small>Possible Score</small></label>
            <input type='number' min='0' name='possibleScore' placeholder='Possible Score' defaultValue={possibleScore} ref={register({ required: true, min: 0 })} />
            {errors.score && 'Score must be a numerical value'}
          </div>
          <input type='submit' value='Save Score'></input>
        </form>
      </div>
    </div>
  );
};

ProgressScoreEntry.propTypes = {
  scoreId: PropTypes.string.isRequired,
  studentName: PropTypes.string.isRequired,
  playlistName: PropTypes.string.isRequired,
  score: PropTypes.oneOf([PropTypes.number, null]),
  possibleScore: PropTypes.oneOf([PropTypes.number, null]),
}

export default ProgressScoreEntry;