import React from 'react';
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../components/PageTitle';
import Loading from '../../../components/Loading';
import CourseTimelines from '../../../components/courses/CourseTimelines';
import { GET_INSTRUCTING_COURSES } from '../../../gql/queries';

const teacherCourses = () => {
  const { loading, error, data } = useQuery(GET_INSTRUCTING_COURSES);

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
            owner={course.owner}
          />
        ))
      )}
    </div >
  );
};

export default teacherCourses;