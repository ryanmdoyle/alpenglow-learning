import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import PageTitle from '../../../components/PageTitle';
import Loading from '../../../components/Loading';
import PagePadding from '../../../components/styled/blocks/PagePadding';
import QuizRequest from '../../../components/progress/QuizRequest';

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
  const { loading, error, data: requestData } = useQuery(GET_STUDENT_QUIZ_REQUESTS, {
    pollInterval: 3000,
  });
  if (loading) return <Loading />
  return (
    <div>
      <PageTitle>Grades</PageTitle>
      <PagePadding>
        <h4>Pending Quiz Requests</h4>
        {requestData?.getStudentRequests && (
          requestData?.getStudentRequests.map(request => (
            <QuizRequest
              id={request._id}
              name={request.user.name}
              playlist={request.playlist.name}
              approved={request.approved}
              approvalAccepted={request.approvalAccepted}
              key={request._id}
            />
          ))
        )}
        <h4>Pending Scores</h4>
      </PagePadding>
    </div>
  );
};

export default grading;
export { GET_STUDENT_QUIZ_REQUESTS };