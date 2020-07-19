import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Link from 'next/link';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import Loading from '../Loading';
import ProgressBox_Course from './ProgressBox_Course';

const tableStyles = css`
  width: 100%;
  padding: 1rem 0;
  border-collapse: collapse;

  tbody > tr {
    :hover {
      box-shadow: var(--shadowMedium);
      border-radius: var(--borderRadius);
    }
  }

  thead > tr > th {
    text-align: center;
    font-family: var(--headerFontFamily);
    font-size: 1.2rem;
    color: var(--blueMedium);
    padding: 1rem 0 0.5rem 0;
  }

  thead > tr > th:first-of-type {
    padding-left: 1rem;
    text-align: left;
  }
  
  tbody > tr > th {
    text-align: left;
    font-family: var(--headerFontFamily);
    font-size: 0.9rem;
    vertical-align: center;
    padding: 1rem 0 1rem 1rem;
  }
  
  tbody > tr > td {
    text-align: center;
    padding: 1rem 0;
  }
`;

const GET_ALL_PROGRESS = gql`
  query GET_ALL_PROGRESS {
    getCoursesInstructing {
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
      classes {
        _id
        enrolled {
          _id
          name
        }
      }
    }
    getStudentsInstructing {
      _id
      name
    }
    getScoresInstructing {
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

const ProgressTable_Courses = () => {
  const { loading, error, data } = useQuery(GET_ALL_PROGRESS);
  const courses = data?.getCoursesInstructing;
  const scores = data?.getScoresInstructing;
  const students = data?.getStudentsInstructing;

  if (loading) return <Loading />

  return (
    <table css={tableStyles}>
      <thead>
        <tr>
          <th scope='col'>Student</th>
          {courses && (
            courses.map(course => (
              <th scope='col' key={course._id}>{course.name}</th>
            ))
          )}
        </tr>
      </thead>

      <tbody>
        {students && (
          students.map(student => {
            // filter all scores for only current student;
            const studentScores = scores.filter(score => score.user._id === student._id);

            // return row of student progress
            return (
              <Link href='/teacher/progress/student/[studentId]' as={`/teacher/progress/student/${student._id}`}>
                <tr key={student._id}>
                  <th scope='row'>{student.name}</th>
                  {courses.map(course => {
                    // if student not in course, don't return a progress bar
                    const studentsInCourse = [];
                    course.classes.forEach(classs => {
                      classs.enrolled.forEach(student => {
                        if (!studentsInCourse.includes(student._id)) {
                          studentsInCourse.push(student._id)
                        }
                      })
                    })
                    if (!studentsInCourse.includes(student._id)) return null;

                    // if student is on course, calculate progress and show bar
                    const { essentialPlaylists, corePlaylists, challengePlaylists, name, _id } = course;
                    // Make array of playlists in current course
                    const coursePlaylists = [...essentialPlaylists, ...corePlaylists, ...challengePlaylists];
                    const coursePlaylistIds = coursePlaylists.map(course => course._id);
                    // filter scores to only includes ones for current 
                    const studentsCourseScores = studentScores.filter(score => coursePlaylistIds.includes(score.playlist._id));
                    // make new array of playlist Id's and score percents, then sort greatest to least
                    const studentPlaylistPercents = studentsCourseScores.map(score => {
                      const percent = parseInt(score.score / score.possibleScore * 100);
                      return {
                        playlistId: score.playlist._id,
                        percent: percent,
                      }
                    })
                    studentPlaylistPercents.sort((a, b) => b.percent - a.percent);

                    let complete = 0;
                    let partial = 0;
                    let low = 0;
                    const checkedPlaylists = [];

                    studentPlaylistPercents.forEach(score => {
                      if (!checkedPlaylists.includes(score.playlistId)) {
                        checkedPlaylists.push(score.playlistId);
                        if (score.percent >= 80) { complete += 1; }
                        else if (score.percent >= 70) { partial += 1; }
                        else if (score.percent >= 0) { low += 1; }
                      }
                    })

                    return (
                      <td key={course._id}>
                        <ProgressBox_Course
                          totalPlaylists={essentialPlaylists.length + corePlaylists.length + challengePlaylists.length}
                          totalAttempts={checkedPlaylists.length}
                          completeAttempts={complete}
                          partialAttempts={partial}
                          lowAttempts={low}
                        />
                      </td>
                    )
                  })}
                </tr>
              </Link>
            )
          })
        )}
      </tbody>
    </table>
  );
};

ProgressTable_Courses.proptypes = {
  courses: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
}

export default ProgressTable_Courses;