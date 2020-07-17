import React from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import PercentScoreRectangle from '../../styled/elements/PercentScoreRectangle';
import Loading from '../../Loading';

const tableWrapper = css`
  position: relative;
	overflow-y: scroll;
  white-space: nowrap;
  width: 100%;
  padding-top: 3rem;

  table {
    /* border-collapse: collapse; */
    border-spacing: 0;
    table-layout: fixed;
    border-bottom: 1px solid var(--pink);
  }
  
  td {
    min-width: 120px;
    padding: 0.5rem;
    word-wrap: normal;
  }

  th {
    /* transform: rotate(-10deg); */
    max-width: 200px;
    max-height: 50px;
    color: var(--pink);
    border-bottom: 1px solid var(--pink);
    padding: 0.5rem 0.25rem;
    margin-bottom: 0.25rem;
    word-wrap: normal;
    white-space: normal;
  }

  th:first-of-type, td:first-of-type {
    transform: rotate(0deg);
    background-color: white;
    position: sticky;
    position: -webkit-sticky;    
    min-width: 200px;
    left: 0;    
    padding-left: 0;
    margin-left: 1px;
    font-weight: bold;
  }

  th:first-of-type { 
    background-color: white;
    z-index: 1;
  }

  td:first-of-type {
    /* background-color: #DDE6F9; */
    padding-left: 1rem;
    border-right: 1px solid var(--pink);
  }

  tr:hover {
    td {
    background-color: #ECF0F9;
    }
  }

  small {
    display: flex;
    height: 60px;
    width: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .score {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const GET_CLASS_PROGRESS = gql`
  query GET_CLASS_PROGRESS($classId: ID!) {
    getInstructingClass(classId: $classId) {
      _id
      name
      enrolled {
        _id
        name
      }
    }
    getParentCourse(classId: $classId) {
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
    getScoresForClass(classId: $classId) {
      _id
      score
      possibleScore
      user {
        _id
      }
      playlist {
        _id
      }
    }
  }
`;

const clipTitle = (text) => {
  const textArr = text.split('');
  if (textArr.length <= 45) {
    return text
  };
  const shortArr = [];
  textArr.forEach((char, index) => {
    if (index <= 44) shortArr.push(char);
  })
  const shortString = shortArr.join('');
  return shortString + '...';
}

const longname = 'Hello this is a playlist name that is way too long for the purposes of the name.'

const ClassProgressTable = () => {
  const { query: { classId } } = useRouter();
  const { loading, error, data } = useQuery(GET_CLASS_PROGRESS, {
    pollInterval: 60000,
    variables: {
      classId
    }
  });
  if (loading) return <Loading />
  const essential = data?.getParentCourse?.essentialPlaylists;
  const core = data?.getParentCourse?.corePlaylists;
  const challenge = data?.getParentCourse?.challengePlaylists;
  const students = data?.getInstructingClass?.enrolled;
  return (
    <div css={tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            {essential.map(essential => (
              <th>
                <small title={essential.name}>{clipTitle(essential.name)}</small>
              </th>
            ))}
            {core.map(core => (
              <th>
                <small title={core.name}>{clipTitle(core.name)}</small>
              </th>
            ))}
            {challenge.map(challenge => (
              <th>
                <small title={challenge.name}>{clipTitle(challenge.name)}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map(student => {
            const studentScores = data?.getScoresForClass?.filter(score => score.user._id == student._id);
            return (
              <tr>
                <td>{student.name}</td>
                {essential.map(essentialPl => {
                  const score = studentScores?.filter(score => score.playlist._id == essentialPl._id);
                  const percent = score.length > 0 ? (score[0].score / score[0].possibleScore * 100) : null;
                  return (
                    <td>
                      <div className='score'>
                        <PercentScoreRectangle percent={percent} />
                      </div>
                    </td>
                  )
                })}
                {core.map(corePl => {
                  const score = studentScores?.filter(score => score.playlist._id == corePl._id);
                  const percent = score.length > 0 ? (score[0].score / score[0].possibleScore * 100) : null;
                  return (
                    <td>
                      <div className='score'>
                        <PercentScoreRectangle percent={percent} />
                      </div>
                    </td>
                  )
                })}
                {challenge.map(challengePl => {
                  const score = studentScores?.filter(score => score.playlist._id == challengePl._id);
                  const percent = score.length > 0 ? (score[0].score / score[0].possibleScore * 100) : null;
                  return (
                    <td>
                      <div className='score'>
                        <PercentScoreRectangle percent={percent} />
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClassProgressTable;