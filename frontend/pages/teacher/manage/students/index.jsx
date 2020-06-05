import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../../components/PageTitle';
import PagePadding from '../../../../components/styled/PagePadding';
import Loading from '../../../../components/Loading';
import { TextTableContainer, TextTableHeader, TextTableRow } from '../../../../components/styled/tables/TextTable';
import { GET_INSTRUCTING_STUDENTS_QUERY } from '../../../../gql/queries';

const studentList = () => {
  const { loading, error, data } = useQuery(GET_INSTRUCTING_STUDENTS_QUERY);
  
  if (error) return null;
  if (loading) return <Loading />;
  return (
    <>
      <PageTitle>Manage Your Students</PageTitle>
      <PagePadding>
        <h4>All Students Enrolled in Classes</h4>
        <TextTableContainer>
          <TextTableHeader>
            <span>Name</span>
            <span>Email</span>
            <span>Enrolled Classes</span>
          </TextTableHeader>
          {data.getInstructingStudents.map(student => (
            <TextTableRow key={student._id} linkHref='/teacher/manage/students/[studentId]' linkAs={`/teacher/manage/students/${student._id}`}>
              <span>{student.name}</span>
              <span>{student.email}</span>
              <span>{student.enrolledClasses.length}</span>
            </TextTableRow>
          ))}
        </TextTableContainer>
      </PagePadding>
    </>
  );
};

export default studentList;