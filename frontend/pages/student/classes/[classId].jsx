import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import PageTitle from '../../../components/styled/PageTitle';
import PagePadding from '../../../components/styled/PagePadding';
import Loading from '../../../components/Loading';
import AlertContext from '../../../components/context/AlertContext';
import ModalContext from '../../../components/context/ModalContext';
import CreateTaskForm from '../../../components/forms/create/CreateTaskForm';
import PlusButtonWithText from '../../../components/styled/elements/PlusButtonWithText';
import { GET_STUDENT_CLASS } from '../../../gql/queries';

const doubleHeader = css`
  display: flex;
  div {
    width: 49%;
    padding-right: 1%; 
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
              <li>{task.description}</li>
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
              <li>{task.description}</li>
              ) 
            })}
            </ul>
            <PlusButtonWithText onClick={addTodo}>Add Todo</PlusButtonWithText>
          </div>
        </div>
        <h4>Past Scores</h4>
      </PagePadding>
    </>
  );
};

export default studentClass;