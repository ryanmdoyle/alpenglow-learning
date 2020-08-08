import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

import AlertContext from '../context/AlertContext';
import TrashCanButton from '../styled/elements/TrashCanButton';
import { GET_STUDENT_REQS_AND_PENDING_SCORES } from '../../gql/queries';

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
  }
  .scoreEntry {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    form {
      width: 100%;
      display: flex;
      justify-self: flex-end;
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

const DELETE_SCORE = gql`
  mutation DELETE_SCORE($scoreId: ID!) {
    deleteScore(scoreId: $scoreId) {
      _id
    }
  }
`;

const ProgressScoreEntry = ({ scoreId, studentName, playlistName, score, possibleScore, timeScored }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);

  const [update, { data: updateData }] = useMutation(UPDATE_SCORE, {
    onCompleted: () => { alert.success('Successfully saved score!', 2) },
    refetchQueries: [{ query: GET_STUDENT_REQS_AND_PENDING_SCORES }],
  });

  const [removeScore, { data: deleteData }] = useMutation(DELETE_SCORE, {
    onCompleted: () => { alert.success('Removed score.') },
    refetchQueries: [{ query: GET_STUDENT_REQS_AND_PENDING_SCORES }],
  })

  const onSubmit = data => {
    update({
      variables: {
        scoreId: scoreId,
        score: parseInt(data.score),
        possibleScore: parseInt(data.possibleScore),
      }
    })
  }

  const trashScore = () => {
    removeScore({
      variables: { scoreId: scoreId }
    })
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
  const scoredDate = new Date(timeScored);
  return (
    <div css={pendingScoreStyle}>
      <div className='studentInfo'>
        <p>{studentName}</p>
        <small>{playlistName}{timeScored ? ` - ${scoredDate.toLocaleDateString(undefined, options)}` : null}</small>
      </div>
      <div className='scoreEntry'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='inputContainer'>
            <label htmlFor='score'><small>Score</small></label>
            <input type='number' min='0' name='score' defaultValue={score ? score : null} ref={register({ required: true, min: 0 })} />
            {errors.score && 'Score must be a numerical value'}
          </div>
          <div className='inputContainer'>
            <label htmlFor='possibleScore'><small>Possible Score</small></label>
            <input type='number' min='0' name='possibleScore' placeholder='Possible Score' defaultValue={possibleScore} ref={register({ required: true, min: 0 })} />
            {errors.score && 'Score must be a numerical value'}
          </div>
          <input type='submit' value={score && possibleScore ? 'Update' : 'Save Score'} css={css`margin-right: 0.5rem;`} ></input>
          <TrashCanButton onClick={trashScore} />
        </form>
      </div>
    </div>
  );
};

ProgressScoreEntry.propTypes = {
  scoreId: PropTypes.string.isRequired,
  studentName: PropTypes.string.isRequired,
  playlistName: PropTypes.string.isRequired,
  // score: PropTypes.oneOf([PropTypes.number, null]),
  // possibleScore: PropTypes.oneOf([PropTypes.number, null]),
}

export default ProgressScoreEntry;