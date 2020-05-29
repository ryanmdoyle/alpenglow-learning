import React from 'react';
import PageTitle from '../../components/PageTitle';
import { useQuery } from '@apollo/react-hooks'

import Loading from '../../components/Loading';
import CourseTimeline from '../../components/courses/CourseTimeline';
import { INSTRUCTING_COURSES_QUERY } from '../../gql/queries';

const teacherCourses = () => {
  const { loading, error, data } = useQuery(INSTRUCTING_COURSES_QUERY);

  if (error) return null;
  if (loading) return <Loading />;
  return (
    <div>
      <PageTitle>Course Curriculum</PageTitle>
      {data.getInstructingCourses && (
        data.getInstructingCourses.map(course => (
          <CourseTimeline
            name={course.name}
            courseId={course._id}
            playlists={course.playlists}
            subject={course.subject}
            key={course._id}
          />
        ))
      )}
    </div >
  );
};

export default teacherCourses;
export { INSTRUCTING_COURSES_QUERY };