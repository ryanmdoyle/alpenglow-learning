import React from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import PageTitle from '../../../components/PageTitle';
import Loading from '../../../components/Loading';
import PagePadding from '../../../components/styled/blocks/PagePadding';
import QuizRequest from '../../../components/progress/QuizRequest';
import ProgressScoreEntry from '../../../components/progress/ProgressScoreEntry';

const GET_STUDENT_QUIZ_REQUESTS = gql`
  query GET_STUDENT_QUIZ_REQUESTS {
    getRequests {
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
// LATER COMBINE BOTH OF THESE QUERIES FOR POLLING PURPOSES
const GET_PENDING_SCORES = gql`
  query GET_PENDING_SCORES {
    getScoresPending {
      _id
      user {
        name
      }
      playlist {
        name
      }
      score
      possibleScore
    }
  }
`;

const grading = () => {
  const { loading, error, data: requestData } = useQuery(GET_STUDENT_QUIZ_REQUESTS, {
    pollInterval: 3000,
  });

  const { data: scoreData } = useQuery(GET_PENDING_SCORES, {
    pollInterval: 3000,
  });

  console.log(scoreData)

  const pending = requestData?.getRequests.filter(request => request.approvalAccepted == false)
  const inProgress = requestData?.getRequests.filter(request => request.approvalAccepted)

  if (loading) return <Loading />
  return (
    <div>
      <PageTitle>Grades</PageTitle>
      <PagePadding>
        <div css={css`display: flex;`}>
          <div css={css`width: 49%;`}>
            <h4>Pending Quiz Requests</h4>
            {(requestData?.getRequests && pending.length == 0) && (
              <em>No current quiz requests.</em>
            )}
            {requestData?.getRequests && (
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
            {(requestData?.getRequests && inProgress.length == 0) && (
              <em>No quizzes are in progress.</em>
            )}
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
        {(scoreData?.getScoresPending.length == 0) && (
          <em>All quizzes have been scored.</em>
        )}
        {scoreData && scoreData?.getScoresPending.map(score => (
          <ProgressScoreEntry
            scoreId={score._id}
            studentName={score?.user?.name}
            playlistName={score?.playlist?.name}
            score={score.score}
            possibleScore={score.possibleScore}
            key={score._id}
          />
        ))}
      </PagePadding>
    </div>
  );
};

export default grading;
export { GET_STUDENT_QUIZ_REQUESTS, GET_PENDING_SCORES };