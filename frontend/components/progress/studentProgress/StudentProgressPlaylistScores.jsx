import React from 'react';

import PagePadding from '../../styled/PagePadding';
import ProgressScoreEntry from '../ProgressScoreEntry';

const StudentProgressPlaylistScores = ({studentName, playlistName, playlistId, scores}) => {
  const scoresForPlaylist = scores.filter(score => score.playlist._id == playlistId).sort((a, b) => b.timeScored - a.timeScored);
  return (
    <PagePadding>
      <h4>{playlistName}</h4>
      {scoresForPlaylist.length == 0 ? 
        <p>Student has no scores for this playlist.</p>
        :
        (
          scoresForPlaylist.map(score => (
            <ProgressScoreEntry
              scoreId={score._id}
              studentName={studentName}
              playlistName={playlistName}
              score={score.score}
              possibleScore={score.possibleScore}
              timeScored={score.timeScored}
              key={score._id}
            />
          ))
        )  
    }
    </PagePadding>
  );
};

export default StudentProgressPlaylistScores;