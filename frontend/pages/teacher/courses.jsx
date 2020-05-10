import React from 'react';
import PageTitle from '../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import Loading from '../../components/Loading';
import PagePadding from '../../components/styled/PagePadding';
import CourseTimeline from '../../components/CourseTimeline';

const INSTRUCTING_COURSES_QUERY = gql`
  query INSTRUCTING_COURSES_QUERY {
    getInstructingCourses {
      _id
      name
      subject
      description
      playlists {
        _id
        name
      }
    }
  }
`;

const teacherCourses = () => {
  const { loading, error, data } = useQuery(INSTRUCTING_COURSES_QUERY);

  if (loading) return <Loading />;
  console.log(data);
  return (
    <div>
      <PageTitle title='Courses You Teach' />
      <PagePadding>
        {data.getInstructingCourses && (
          data.getInstructingCourses.map(course => (
            <>
              <h3>{course.name}</h3>
              <small>{course.description}</small>
              {course.playlists.map(playlist => (
                <h5>{playlist.name}</h5>
              ))}
            </>
          ))
        )}
      </PagePadding>
    </div >
  );
};

export default teacherCourses;