import React, { useContext, useEffect } from 'react';
import { css } from '@emotion/core';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

import AlertContext from '../../context/AlertContext'
import ModalContext from '../../context/ModalContext'
import { GET_CLASS_PROGRESS } from '../../../gql/queries';

const newScoreStyle = css`
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
  input[type=submit]:disabled {
    padding: 0 1rem;
    opacity: 0.5;
    cursor: disable;
    :hover {
      background-color: var(--red);
    }
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

const CREATE_SCORE = gql`
  mutation CREATE_SCORE(
    $playlistId: ID!,
    $userId: ID,
    $score: Int,
    $possibleScore: Int,
    $timeScored: Date,
  ) {
    createScore(
      playlistId: $playlistId,
      userId: $userId,
      score: $score,
      possibleScore: $possibleScore,
      timeScored: $timeScored,
    ) {
      _id
    }
  }
`;

const ClassProgressPlaylistStudentScore = ({ student, studentScore, possibleScore, playlistId, queryLoading, classId }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const [createScore, { data: createScoreData }] = useMutation(CREATE_SCORE, {
    onError: () => {
      modal.close();
      alert.error('Sorry, there was an issue, try again later!', 2)
    },
    refetchQueries: [{ query: GET_CLASS_PROGRESS, variables: { classId: classId } }],
  });

  useEffect(() => {
    console.log(queryLoading);
  }, [queryLoading])

  const saveScore = data => {
    createScore({
      variables: {
        playlistId: playlistId,
        userId: student._id,
        score: parseInt(data.score) || null,
        possibleScore: parseInt(data.possibleScore) || null,
        timeScored: Date.now(),
      }
    })
  }

  return (
    <div css={newScoreStyle} key={student._id}>
      <div className='studentName'>
        <p>{student.name}</p>
      </div>
      <div className='scoreEntry'>
        <form onSubmit={handleSubmit(saveScore)}>
          <div className='inputContainer'>
            <label htmlFor='score'><small>Score</small></label>
            <input type='number' min='0' name='score' defaultValue={studentScore} ref={register({ required: true, min: 0 })} />
            {errors.score && 'Score must be a numerical value'}
          </div>
          <div className='inputContainer'>
            <label htmlFor='possibleScore'><small>Possible Score</small></label>
            <input type='number' min='0' name='possibleScore' placeholder='Possible Score' defaultValue={possibleScore} ref={register({ required: true, min: 0 })} />
            {errors.score && 'Score must be a numerical value'}
          </div>
          <input type='submit' disabled={queryLoading} value={queryLoading ? "Saving..." : "Save"} css={css`margin-right: 0.5rem;`} ></input>
        </form>
      </div>
    </div>
  );
};

export default ClassProgressPlaylistStudentScore;