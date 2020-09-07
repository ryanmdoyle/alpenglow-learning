import React from 'react';
import { css } from '@emotion/core';
import { gql, useQuery } from '@apollo/client';

import ClassProgressPlaylistStudentScore from './ClassProgressPlaylistStudentScore';

const PLAYLIST_QUIZ_FOR_CLASS = gql`
  query PLAYLIST_QUIZ_FOR_CLASS($playlistId: ID!) {
    getScoresForPlaylist(playlistId: $playlistId) {
      user {
        _id
        name
      }
      score
      possibleScore
    }
    getQuizForPlaylist(playlistId: $playlistId) {
      possibleScore
    }
  }
`;

const ClassProgressPlaylistScores = ({ playlistId, playlistName, students, classId }) => {

  const { data, error, loading } = useQuery(PLAYLIST_QUIZ_FOR_CLASS, {
    variables: {
      playlistId: playlistId,
    },
  })
  const possibleScore = data?.getQuizForPlaylist?.possibleScore;

  return (
    <>
      <h4 css={css`text-align:center;`}>Scores for {playlistName}</h4>
      <br></br>
      <div>
        {(students == undefined || !students) ? null : (
          students.map(student => {
            let studentScore = null;
            // get the highest score for the students playlist score
            data?.getScoresForPlaylist.forEach(score => {
              if (score.user._id == student._id && score.score > studentScore) {
                studentScore = score.score;
              }
            })
            return (
              <ClassProgressPlaylistStudentScore
                key={student._id}
                classId={classId}
                student={student}
                studentScore={studentScore}
                possibleScore={possibleScore}
                playlistId={playlistId}
                queryLoading={loading}
              />
            )
          })
        )}
      </div>
    </>
  );
};

export default ClassProgressPlaylistScores;