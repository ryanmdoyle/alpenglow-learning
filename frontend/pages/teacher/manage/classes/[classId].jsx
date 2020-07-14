import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router';

import PageTitle from '../../../../components/PageTitle';
import Loading from '../../../../components/Loading';
import PagePadding from '../../../../components/styled/blocks/PagePadding';
import AlertContext from '../../../../components/context/AlertContext';
import { ListContainer, ListRow } from '../../../../components/styled/blocks/List';

const trash = css`
  :hover {
    color: var(--red);
  }
`;

const GET_CLASS_TO_MANAGE = gql`
  query GET_CLASS_TO_MANAGE($classId: ID!) {
    getInstructingClass(classId: $classId) {
      _id
      name
      enrolled {
        _id
        name
        email
      }
      course
    }
  }
`;

const REMOVE_STUDENT_FROM_CLASS = gql`
  mutation REMOVE_STUDENT_FROM_CLASS(
    $studentId: ID!,
    $classId: ID!,
  ) {
    removeEnrollment(
      studentId: $studentId,
      classId: $classId,
    ) {
      _id
    }
  }
`;

const manageClass = () => {
  const router = useRouter();
  const { classId } = router.query;
  const alert = useContext(AlertContext);

  const { loading, error, data } = useQuery(GET_CLASS_TO_MANAGE, {
    variables: {
      classId: classId,
    }
  })

  const [unenroll, { data: unenrollData }] = useMutation(REMOVE_STUDENT_FROM_CLASS, {
    refetchQueries: [{ query: GET_CLASS_TO_MANAGE, variables: {classId: classId} }],
    onCompleted: (data) => {
      alert.success(`Successfully updated course.`)
    },
  });

  const handleUnenroll = (studentId) => {
    unenroll({
      variables: {
        studentId: studentId,
        classId: classId,
      }
    })
  }

  if (loading) return <Loading />
  const { course, enrolled, name } = data?.getInstructingClass;
  return (
    <>
      <PageTitle>{`Manage ${name}`}</PageTitle>
      <PagePadding>
        <h4>Students Enrolled in {name}</h4>
        <ListContainer>
          {enrolled.map(student => {
            const enrolled = '5';
            return (
              <ListRow key={student._id}>
                <span>{student.name}</span>
                <span>{student.email}</span>
                <i css={trash} className="material-icons delete" onClick={() => { handleUnenroll(student._id) }}>delete</i>
              </ListRow>
            )
          })}
        </ListContainer>
      </PagePadding>
    </>
  );
};

export default manageClass;