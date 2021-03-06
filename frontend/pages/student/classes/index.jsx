import React from 'react';
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client'
import _ from 'lodash'

import PageFade from '../../../components/styled/blocks/PageFade';
import PageTitle from '../../../components/styled/PageTitle';
import Loading from '../../../components/Loading';
import CourseTimelines from '../../../components/courses/CourseTimelines';
import { GET_ENROLLED_COURSES } from '../../../gql/queries';


const studentClasses = () => {
  const { loading, error, data } = useQuery(GET_ENROLLED_COURSES);
  if (error) return null;
  if (loading) return <Loading />;

  const coursesEnrolled = _.cloneDeep(data.getCoursesEnrolled);

  // iterates through all course playlists and adds the best score
  const coursesWithScores = coursesEnrolled.map(course => {
    // for essential playlists
    course.essentialPlaylists.map(playlist => {
      playlist.best = null;
      data.getScores.forEach(score => {
        if (score.playlist._id === playlist._id) {
          const percent = parseInt(score.score / score.possibleScore * 100);
          if (percent > playlist.best) { playlist.best = percent }
        }
      })
      return playlist;
    })
    // for core playlists
    course.corePlaylists.map(playlist => {
      playlist.best = null;
      data.getScores.forEach(score => {
        if (score.playlist._id === playlist._id) {
          const percent = parseInt(score.score / score.possibleScore * 100);
          if (percent > playlist.best) { playlist.best = percent }
        }
      })
      return playlist;
    })
    //for chalengePlaylists
    course.challengePlaylists.map(playlist => {
      playlist.best = null;
      data.getScores.forEach(score => {
        if (score.playlist._id === playlist._id) {
          const percent = parseInt(score.score / score.possibleScore * 100);
          if (percent > playlist.best) { playlist.best = percent }
        }
      })
      return playlist;
    })
    return course;
  })

  return (
    <PageFade>
      <Head>
        <title>Alpenglow Learning - All Class Progress</title>
        <meta name='description' content={`All Class Progress`}></meta>
      </Head>
      <PageTitle>All Classes</PageTitle>
      {coursesWithScores && (
        coursesWithScores.map(course => {
          if (course.essentialPlaylists.length > 0 || course.corePlaylists.length) {
            return (
              <CourseTimelines
                name={course.name}
                courseId={course._id}
                essentialPlaylists={course.essentialPlaylists}
                corePlaylists={course.corePlaylists}
                challengePlaylists={course.challengePlaylists}
                subject={course.subject}
                key={course._id}
              />
            )
          }
        })
      )}
    </PageFade>
  );
};

export default studentClasses;