import React from 'react';
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../components/PageTitle';
import Loading from '../../../components/Loading';
import CourseTimelines from '../../../components/courses/CourseTimelines';
import { INSTRUCTING_COURSES_QUERY } from '../../../gql/queries';

const teacherCourses = () => {
  const { loading, error, data } = useQuery(INSTRUCTING_COURSES_QUERY);

  if (error) return null;
  if (loading) return <Loading />;
  return (
    <div>
      <PageTitle>Manage Course Curriculum</PageTitle>
      {data.getInstructingCourses && (
        data.getInstructingCourses.map(course => (
          <CourseTimelines
            name={course.name}
            courseId={course._id}
            essentialPlaylists={course.essentialPlaylists}
            corePlaylists={course.corePlaylists}
            challengePlaylists={course.challengePlaylists}
            subject={course.subject}
            key={course._id}
          />
        ))
      )}
    </div >
  );
};

export default teacherCourses;