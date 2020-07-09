import React from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
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

  const pending = requestData?.getStudentRequests.filter(request => request.approvalAccepted == false)
  const inProgress = requestData?.getStudentRequests.filter(request => request.approvalAccepted)

  if (loading) return <Loading />
  return (
    <div>
      <PageTitle>Grades</PageTitle>
      <PagePadding>
        <div css={css`display: flex;`}>
          <div css={css`width: 49%;`}>
            <h4>Pending Quiz Requests</h4>
            {requestData?.getStudentRequests && (
              pending?.map(request => (
                <QuizRequest
                  requestId={request._id}
                  name={request.user.name}
                  playlistName={request.playlist.name}
                  approved={request.approved}
                  approvalAccepted={request.approvalAccepted}
                  key={request._id}
                />
              ))
            )}

          </div>
          <div css={css`width: 49%; margin-left: 2%;`}>
            <h4>In Progress</h4>
            {inProgress?.map(request => (
              <QuizRequest
                requestId={request._id}
                name={request.user.name}
                playlistName={request.playlist.name}
                approved={request.approved}
                approvalAccepted={request.approvalAccepted}
                key={request._id}
              />
            ))}
          </div>
        </div>
        <h4>Pending Scores</h4>
      </PagePadding>
    </div>
  );
};

export default grading;
export { GET_STUDENT_QUIZ_REQUESTS };