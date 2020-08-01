import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Link from 'next/link';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import Loading from '../Loading';
import ProgressCourseBox from './ProgressCourseBox';

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
    }
    # this gets the classes instructing, but we really need the students classes
    getClassesInstructing {
      _id
      course {
        _id
      }
      name
      enrollId
      enrolled {
        _id
      }
    }
    getUsersInstructing {
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

const ProgressCoursesTable = () => {
  const { loading, error, data } = useQuery(GET_ALL_PROGRESS);
  console.log(data)
  const courses = data?.getCoursesInstructing;
  const classes = data?.getClassesInstructing;
  const scores = data?.getScoresInstructing;
  const students = data?.getUsersInstructing;

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

      {students.length === 0 ?
        <tbody>
          <tr>
            <td>
              No students currently enrolled.
            </td>
          </tr>
        </tbody> : (
          <tbody>
            {students && (
              students.map(student => {
                // filter all scores for only current student;
                const studentScores = scores.filter(score => score.user._id === student._id);
                const studentCourses = classes.map(classs => classs.course);
                console.log('studentCourses', studentCourses)

                // return row of student progress
                return (
                  <Link href='/teacher/progress/student/[studentId]' as={`/teacher/progress/student/${student._id}`} key={student._id}>
                    <tr>
                      <th scope='row'>{student.name}</th>
                      {courses.map(course => {
                        // if student not in course, don't return a progress bar
                        const studentsInCourse = [];
                        classes.forEach(classs => {
                          classs.enrolled.forEach(student => {
                            if (!studentsInCourse.includes(student._id)) {
                              studentsInCourse.push(student._id)
                            }
                          })
                        })
                        console.log(course.name, studentsInCourse)

                        // return if the the student is not enrolled in the class/course
                        if (!studentsInCourse.includes(student._id)) return (
                          <td key={course._id}><small>n/a</small></td>
                        )

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
                            <ProgressCourseBox
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
        )}

    </table>
  );
};

ProgressCoursesTable.proptypes = {
  courses: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
}

export default ProgressCoursesTable;