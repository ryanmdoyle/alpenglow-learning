import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/core';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import PercentScoreRectangle from '../../styled/elements/PercentScoreRectangle';
import Loading from '../../Loading';

const tableWrapper = css`
  position: relative;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  padding-top: 3rem;

  table {
    /* border-collapse: collapse; */
    border-spacing: 0;
    table-layout: fixed;
    border-bottom: 1px solid var(--pink);
    margin-bottom: 0.5rem;
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
    getClassInstructing(classId: $classId) {
      _id
      name
      enrolled {
        _id
        name
      }
    }
    getCourseOfClass(classId: $classId) {
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

const ClassProgressTable = () => {
  const { query: { classId } } = useRouter();
  const { loading, error, data } = useQuery(GET_CLASS_PROGRESS, {
    pollInterval: 60000,
    variables: {
      classId
    }
  });

  if (loading) return <Loading />
  const essential = data?.getCourseOfClass?.essentialPlaylists;
  const core = data?.getCourseOfClass?.corePlaylists;
  const challenge = data?.getCourseOfClass?.challengePlaylists;
  const students = data?.getClassInstructing?.enrolled;

  if (!students || students?.length === 0) return (
    <p>There are currently no students enrolled in this class.</p>
  )
  return (
    <div css={tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            {essential.map(essential => (
              <th key={essential._id}>
                <small title={essential.name}>{clipTitle(essential.name)}</small>
              </th>
            ))}
            {core.map(core => (
              <th key={core._id}>
                <small title={core.name}>{clipTitle(core.name)}</small>
              </th>
            ))}
            {challenge.map(challenge => (
              <th key={challenge._id}>
                <small title={challenge.name}>{clipTitle(challenge.name)}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map(student => {
            const studentScores = data?.getScoresForClass?.filter(score => score.user._id == student._id);
            return (
              <Link href='/teacher/progress/student/[studentId]' as={`/teacher/progress/student/${student._id}`} key={student._id}>
                <tr>
                  <td>{student.name}</td>
                  {essential.map(essentialPl => {
                    const score = studentScores?.filter(score => score.playlist._id == essentialPl._id);
                    const percent = score.length > 0 ? (score[0].score / score[0].possibleScore * 100) : null;
                    return (
                      <td key={essentialPl._id}>
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
                      <td key={corePl._id}>
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
                      <td key={challengePl._id}>
                        <div className='score'>
                          <PercentScoreRectangle percent={percent} />
                        </div>
                      </td>
                    )
                  })}
                </tr>
              </Link>
            )
          })}
        </tbody>
      </table>
    </div >
  );
};

export default ClassProgressTable;