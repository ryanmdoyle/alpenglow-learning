import React, { useContext } from 'react';
import Head from 'next/head';
import { css } from '@emotion/core';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import PageFade from '../../../../components/styled/blocks/PageFade';
import PageTitle from '../../../../components/styled/PageTitle';
import PagePadding from '../../../../components/styled/PagePadding';
import GradesPlaylistScore from '../../../../components/grades/GradesPlaylistScore';
import Loading from '../../../../components/Loading';
import ModalContext from '../../../../components/context/ModalContext';
import StudentProgressPlaylistScores from '../../../../components/progress/studentProgress/StudentProgressPlaylistScores';

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

const GET_STUDENT_PROGRESS = gql`
  query GET_STUDENT_PROGRESS($studentId: ID!) {
    getUser(userId: $studentId) {
      _id
      name
    }
    getScores(userId: $studentId) {
      _id
      score
      possibleScore
      timeScored
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

const studentProgress = () => {
  const modal = useContext(ModalContext);
  const { query: { studentId } } = useRouter();
  const { loading, error, data } = useQuery(GET_STUDENT_PROGRESS, {
    variables: {
      studentId: studentId,
    }
  });
  const classes = data?.getCoursesEnrolled;
  const scores = data?.getScores;

  const openScores = (name, id) => {
    modal.setChildComponent(
      <StudentProgressPlaylistScores
        studentName={data.getUser.name}
        playlistName={name}
        playlistId={id}
        scores={scores}
      />
    )
    modal.open()
  }

  if (loading) return <Loading />
  return (
    <PageFade>
      <Head>
        <title>Alpenglow Learning - Progress for {data.getUser.name}</title>
        <meta name='description' content={`Progress for ${data.getUser.name}`}></meta>
      </Head>
      <PageTitle>{`Progress for ${data.getUser.name}`}</PageTitle>
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
                    <div onClick={() => { openScores(playlist.name, playlist._id) }} key={playlist._id}>
                      <GradesPlaylistScore
                        name={playlist.name}
                        percent={percents[0]}
                      />
                    </div>
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
                    <div onClick={() => { openScores(playlist.name, playlist._id) }} key={playlist._id}>
                      <GradesPlaylistScore
                        name={playlist.name}
                        percent={percents[0]}
                      />
                    </div>
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
                    <div onClick={() => { openScores(playlist.name, playlist._id) }} key={playlist._id}>
                      <GradesPlaylistScore
                        name={playlist.name}
                        percent={percents[0]}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))
        }

      </PagePadding>
    </PageFade>
  );
};

export default studentProgress;