import React from 'react';
import PageTitle from '../../components/PageTitle';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import PagePadding from '../../components/styled/PagePadding';
import GradesPlaylistScore from '../../components/grades/GradesPlaylistScore';

const playlistColumns = css`
  width: 100%;
  display: flex;
  .playlistType {
    padding: 0 0.5rem;
    width: 33%;
    display: flex;
    flex-direction: column;
    h5 { margin-top: 1rem;  }
  }
`;

const GET_GRADES = gql`
  query GET_GRADES {
    getScores {
      _id
      score
      possibleScore
      playlist {
        _id
      }
    }
    getCoursesEnrolled {
      _id
      name
      essentialPlaylists {
        _id
        name
      }
      corePlaylists {
        _id
        name
      }
      challengePlaylists {
        _id
        name
      }
    }
  }
`;

const studentGrades = () => {
  const { loading, error, data } = useQuery(GET_GRADES);
  const classes = data?.getCoursesEnrolled;
  const scores = data?.getScores;
  return (
    <div>
      <PageTitle>Your Grades</PageTitle>
      <PagePadding>
        {classes && classes.map(clas => (
          <div key={clas._id}>
            <h4>{clas.name}</h4>
            <div css={playlistColumns}>
              <div className='playlistType'>
                <h5>Essential</h5>
                {clas.essentialPlaylists.map(playlist => {
                  const matchingScores = scores.filter(score => playlist._id === score.playlist._id);
                  const percents = matchingScores.map(score => parseInt(score.score / score.possibleScore * 100))
                  percents.sort((a, b) => b - a);
                  return (
                    <GradesPlaylistScore
                      name={playlist.name}
                      percent={percents[0]}
                      key={playlist._id}
                    />
                  )
                })}
              </div>
              <div className='playlistType'>
                <h5>Core</h5>
                {clas.corePlaylists.map(playlist => {
                  const matchingScores = scores.filter(score => playlist._id === score.playlist._id);
                  const percents = matchingScores.map(score => parseInt(score.score / score.possibleScore * 100))
                  percents.sort((a, b) => b - a);
                  return (
                    <GradesPlaylistScore
                      name={playlist.name}
                      percent={percents[0]}
                      key={playlist._id}
                    />
                  )
                })}
              </div>
              <div className='playlistType'>
                <h5>Challenge</h5>
                {clas.challengePlaylists.map(playlist => {
                  const matchingScores = scores.filter(score => playlist._id === score.playlist._id);
                  const percents = matchingScores.map(score => parseInt(score.score / score.possibleScore * 100))
                  percents.sort((a, b) => b - a);
                  return (
                    <GradesPlaylistScore
                      name={playlist.name}
                      percent={percents[0]}
                      key={playlist._id}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        ))
        }

      </PagePadding>
    </div>
  );
};

export default studentGrades;