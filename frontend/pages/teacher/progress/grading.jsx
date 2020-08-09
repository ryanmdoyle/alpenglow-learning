import React, { useContext } from 'react';
import Head from 'next/head';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/client';

import PageFade from '../../../components/styled/blocks/PageFade';
import PageTitle from '../../../components/styled/PageTitle';
import Loading from '../../../components/Loading';
import PagePadding from '../../../components/styled/blocks/PagePadding';
import QuizRequest from '../../../components/progress/QuizRequest';
import ProgressScoreEntry from '../../../components/progress/ProgressScoreEntry';
import UserContext from '../../../components/context/UserContext';
import { GET_STUDENT_REQS_AND_PENDING_SCORES } from '../../../gql/queries';

const grading = () => {
  const user = useContext(UserContext);
  const { loading, data } = useQuery(GET_STUDENT_REQS_AND_PENDING_SCORES, {
    pollInterval: 5000,
  })

  const scoreData = data?.getScoresPending;
  const requestData = data?.getRequests;
  const recentScores = data?.getScoresInstructing?.filter(score => score.scoredBy == user._id).sort((a, b) => b.timeScored - a.timeScored);
  const pending = requestData?.filter(request => request.approvalAccepted == false)
  const inProgress = requestData?.filter(request => request.approvalAccepted)

  if (loading) return <Loading />
  return (
    <PageFade>
      <Head>
        <title>Alpenglow Learning - Grading</title>
        <meta name='description' content='Grading and Quiz Requests'></meta>
      </Head>
      <PageTitle>Grades</PageTitle>
      <PagePadding>
        <div css={css`display: flex;`}>
          <div css={css`width: 49%;`}>
            <h4>Pending Quiz Requests</h4>
            {(requestData && pending?.length == 0) && (
              <em>No current quiz requests.</em>
            )}
            {requestData && (
              pending?.map(request => (
                <QuizRequest
                  requestId={request._id}
                  name={request.user.name}
                  playlistId={request.playlist._id}
                  playlistName={request.playlist.name}
                  type={request.type}
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
                playlistId={request.playlist._id}
                playlistName={request.playlist.name}
                approved={request.approved}
                approvalAccepted={request.approvalAccepted}
                key={request._id}
              />
            ))}
          </div>
        </div>
        <h4>Pending Scores</h4>
        {(scoreData?.length == 0) && (
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
        <h4>Recently Scored</h4>
        {(recentScores?.length == 0) && (
          <em>No scores from the last day.</em>
        )}
        {recentScores && recentScores.map(score => {
          const now = Date.now();
          const lastThree = 1000 * 60 * 60 * 24 * 3; //ms * sec/min * min/hr * hr/day * 3days 

          if (score.timeScored > (now - lastThree)) {
            return (
              <ProgressScoreEntry
                scoreId={score._id}
                studentName={score?.user?.name}
                playlistName={score?.playlist?.name}
                score={score.score}
                possibleScore={score.possibleScore}
                timeScored={score.timeScored}
                key={score._id}
              />
            )
          }
        })}
      </PagePadding>
    </PageFade>
  );
};

export default grading;
export { GET_STUDENT_REQS_AND_PENDING_SCORES };