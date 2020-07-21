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

const doubleHeader = css`
  display: flex;
  div {
    width: 49%;
    padding-right: 1%; 
  }
`;

const GET_STUDENT_CLASS = gql`
  query GET_STUDENT_CLASS($classId: ID!) {
    getClass(classId: $classId) {
      _id
      name
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
  // const { name } = data?.getClass;

  const addGoal = () => {
    modal.setChildComponent(
      <CreateTaskForm
        classId={classId}
        taskType='GOAL'
      />
    )
    modal.open();
  }

  if (loading) return <Loading />
  return (
    <>
      <PageTitle>Class Name</PageTitle>
      <PagePadding>
        <div css={doubleHeader}>
          <div>
            <h4>Weekly Goal</h4>
            <PlusButtonWithText onClick={addGoal}>Add Goal</PlusButtonWithText>
          </div>
          <div>
            <h4>To-Do's</h4>
          </div>
        </div>
        <h4>Past Scores</h4>
      </PagePadding>
    </>
  );
};

export default studentClass;