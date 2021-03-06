import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/core';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import PercentScoreRectangle from '../../styled/elements/PercentScoreRectangle';
import Loading from '../../Loading';
import ClassProgressTableHeader from './ClassProgressTableHeader';
import { GET_CLASS_PROGRESS } from '../../../gql/queries';

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
    height: 40px;
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

const ClassProgressTable = () => {
  const { query: { classId } } = useRouter();
  const { loading, data } = useQuery(GET_CLASS_PROGRESS, {
    pollInterval: 10000,
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
              <ClassProgressTableHeader
                playlistId={essential._id}
                classId={classId}
                key={essential._id}
                playlistName={essential.name}
                students={students}
                scores={data.getScoresForClass?.filter(score => score.playlist._id == essential._id)}
              />
            ))}
            {core.map(core => (
              <ClassProgressTableHeader
                playlistId={core._id}
                classId={classId}
                key={core._id}
                playlistName={core.name}
                students={students}
                scores={data.getScoresForClass?.filter(score => score.playlist._id == core._id)}
              />
            ))}
            {challenge.map(challenge => (
              <ClassProgressTableHeader
                playlistId={challenge._id}
                classId={classId}
                key={challenge._id}
                playlistName={challenge.name}
                students={students}
                scores={data.getScoresForClass?.filter(score => score.playlist._id == challenge._id)}
              />
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
                    const scores = studentScores?.filter(score => score.playlist._id == essentialPl._id);
                    const score = scores.map(score => score).sort((a, b) => b.score - a.score);
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