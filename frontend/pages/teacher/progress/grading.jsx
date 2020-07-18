import React from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import PageTitle from '../../../components/PageTitle';
import Loading from '../../../components/Loading';
import PagePadding from '../../../components/styled/blocks/PagePadding';
import QuizRequest from '../../../components/progress/QuizRequest';
import ProgressScoreEntry from '../../../components/progress/ProgressScoreEntry';

const GET_STUDENT_REQS_AND_PENDING_SCORES = gql`
  query GET_STUDENT_REQS_AND_PENDING_SCORES {
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

  const { loading, data } = useQuery(GET_STUDENT_REQS_AND_PENDING_SCORES, {
    pollInterval: 3000,
  })

  const scoreData = data?.getScoresPending;
  const requestData = data?.getRequests;
  const pending = requestData?.filter(request => request.approvalAccepted == false)
  const inProgress = requestData?.filter(request => request.approvalAccepted)

  if (loading) return <Loading />
  return (
    <div>
      <PageTitle>Grades</PageTitle>
      <PagePadding>
        <div css={css`display: flex;`}>
          <div css={css`width: 49%;`}>
            <h4>Pending Quiz Requests</h4>
            {(requestData && pending.length == 0) && (
              <em>No current quiz requests.</em>
            )}
            {requestData && (
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
            {(requestData && inProgress.length == 0) && (
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
        {(scoreData.length == 0) && (
          <em>All quizzes have been scored.</em>
        )}
        {scoreData && scoreData.map(score => (
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
export { GET_STUDENT_REQS_AND_PENDING_SCORES };