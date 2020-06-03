import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../../components/PageTitle';
import PagePadding from '../../../../components/styled/PagePadding';
import ProgressTable_Courses from '../../../../components/progress/ProgressTable_Courses';
import { GET_INSTRUCTING_STUDENTS_QUERY } from '../../../../gql/queries';

const INSTRUCTING_CLASSES_WITH_QUIZZES = gql`
  query INSTRUCTING_CLASSES_WITH_QUIZZES {
    getInstructingClasses {
      _id
      name
    }
    getQuizzes {
      _id
      score
    }
  }
`;

const teacherStudents = () => {
  const { loading: studentsLoading, error: studentsError, data: studentsData } = useQuery(GET_INSTRUCTING_STUDENTS_QUERY);
  const { loading: coursesLoading, error: coursesError, data: coursesData } = useQuery(INSTRUCTING_CLASSES_WITH_QUIZZES);

  console.log(coursesData)
  return (
    <>
      <PageTitle>Student Progress</PageTitle>
      <PagePadding>
        <ProgressTable_Courses />
      </PagePadding>
    </ >
  );
};

export default teacherStudents;