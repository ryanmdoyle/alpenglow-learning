import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import PageTitle from '../../../components/PageTitle';
import PagePadding from '../../../components/styled/PagePadding';

const GET_STUDENT_QUIZ_REQUESTS = gql`
  query GET_STUDENT_QUIZ_REQUESTS {
    getStudentRequests {
      _id
      approved
      approvalAccepted
      user {
        name
      }
      playlist {
        name
      }
    }
  }
`;

const grading = () => {
  const { loading, error, data } = useQuery(GET_STUDENT_QUIZ_REQUESTS);
  console.log(data)
  return (
    <div>
      <PageTitle>Grades</PageTitle>
      <PagePadding>
        <h4>Requests</h4>
      </PagePadding>
    </div>
  );
};

export default grading;