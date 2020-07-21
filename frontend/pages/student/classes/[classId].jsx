import React, { useContext } from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/react-hooks';

import PageTitle from '../../../components/styled/PageTitle';
import PagePadding from '../../../components/styled/PagePadding';
import Loading from '../../../components/Loading';
import AlertContext from '../../../components/context/AlertContext';
import ModalContext from '../../../components/context/ModalContext';
import CreateTaskForm from '../../../components/forms/create/CreateTaskForm';
import PlusButtonWithText from '../../../components/styled/elements/PlusButtonWithText';
import PercentScoreRectangle from '../../../components/styled/elements/PercentScoreRectangle';
import { GET_STUDENT_CLASS } from '../../../gql/queries';

const doubleHeader = css`
  display: flex;
  div {
    width: 49%;
    padding-right: 1%; 
  }
`;

const removeTask = css`
  :hover {
    color: var(--red);
    text-decoration: line-through;
  }
`;

const list = css`
  list-style: none;
  padding: 0;
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-radius: var(--borderRadius);
    :hover {
      box-shadow: var(--shadowMedium);
    }
    .scores {
      display: flex;
      span {
        width: 80px;
        margin-right: 1rem;
      }
    }
  }
`;

const REMOVE_TASK = gql`
  mutation REMOVE_TASK($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      _id
    }
  }
`;

const GET_STUDENT_CLASS_SCORES = gql`
  query GET_STUDENT_CLASS_SCORES($classId: ID!) {
    getScoresForEnrolledClass(classId: $classId) {
      _id
      score
      possibleScore
      timeScored
      playlist {
        _id
        name
      }
    }
  }
`;

const studentClass = () => {
  const router = useRouter();
  const { classId } = router.query;
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const { loading, error, data } = useQuery(GET_STUDENT_CLASS, {
    variables: { classId: classId },
  })

  const { data: scoreData } = useQuery(GET_STUDENT_CLASS_SCORES, {
    variables: { classId: classId },
  })

  const [deleteTask, { data: removeTaskData }] = useMutation(REMOVE_TASK, {
    refetchQueries: [{ query: GET_STUDENT_CLASS, variables: { classId: classId } }],
  });

  const handleTaskRemove = (taskId) => {
    deleteTask({
      variables: { taskId: taskId}
    })
  }
  
  const addGoal = () => {
    modal.setChildComponent(
      <CreateTaskForm
      classId={classId}
      taskType='Goal'
      />
      )
      modal.open();
  }
  
  const addTodo = () => {
    modal.setChildComponent(
      <CreateTaskForm
      classId={classId}
      taskType='Todo'
      />
      )
      modal.open();
    }
    
  if (loading) return <Loading />

  const { name } = data?.getClass;
  return (
    <>
      <PageTitle>{name}</PageTitle>
      <PagePadding>
        <div css={doubleHeader}>
          <div>
            <h4>Weekly Goals</h4>
            <ul>
            {data?.getTasks.map(task => {
              if (task.type == 'GOAL') return (
              <li css={removeTask} onClick={() => {handleTaskRemove(task._id)}} key={task._id}>{task.description}</li>
              ) 
            })}
            </ul>
            <PlusButtonWithText onClick={addGoal}>Add Goal</PlusButtonWithText>
          </div>
          <div>
            <h4>To-Do's</h4>
            <ul>
            {data?.getTasks.map(task => {
              if (task.type == 'TODO') return (
              <li css={removeTask} onClick={() => {handleTaskRemove(task._id)}} key={task._id}>{task.description}</li>
              ) 
            })}
            </ul>
            <PlusButtonWithText onClick={addTodo}>Add Todo</PlusButtonWithText>
          </div>
        </div>
        <h4>Past Playlist Scores</h4>
        <ul css={list}>
          {scoreData?.getScoresForEnrolledClass.map(score => {
            const date = new Date(score.timeScored).toLocaleDateString();
            return (
              <Link href='/student/playlists/[playlistId]' as={`/student/playlists/${score.playlist._id}`}>
                <li key={score._id}>
                  <div css={css`width: 30%;`}>
                    <strong>
                    {score.playlist.name}
                    </strong>
                  </div>
                  <div className='scores'>
                    <span>{date}</span>
                    <span>{score.score}/{score.possibleScore}</span>
                    <PercentScoreRectangle percent={score.score/score.possibleScore*100} />
                  </div>
                </li>
              </Link>
            )}
          )}
        </ul>
      </PagePadding>
    </>
  );
};

export default studentClass;