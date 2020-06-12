import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import PageTitle from '../../../components/PageTitle';
import Loading from '../../../components/Loading';
import PagePadding from '../../../components/styled/PagePadding';
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
  const { loading, error, data: requestData } = useQuery(GET_STUDENT_QUIZ_REQUESTS);
  if (loading) return <Loading />
  return (
    <div>
      <PageTitle>Grades</PageTitle>
      <PagePadding>
        <h4>Quiz Requests</h4>
        {requestData?.getStudentRequests && (
          requestData?.getStudentRequests.map(request => (
            <QuizRequest
              id={request._id}
              name={request.user.name}
              playlist={request.playlist.name}
              approved={request.approved}
              approvalAccepted={request.approvalAccepted}
            />
          ))
        )}
      </PagePadding>
    </div>
  );
};

export default grading;