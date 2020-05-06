import React from 'react';
import PageTitle from '../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import Loading from '../../components/Loading';
import PagePadding from '../../components/styled/PagePadding';

const INSTRUCTING_COURSES_QUERY = gql`
  query INSTRUCTING_COURSES_QUERY {
    getInstructingCourses {
      _id
      name
      subject
      description
      playlists
    }
    getInstructingPlaylists {
      _id
      name
    }
  }
`;

const teacherCourses = () => {
  const { loading, error, data } = useQuery(INSTRUCTING_COURSES_QUERY);

  if (loading) return <Loading />;

  return (
    <div>
      <PageTitle title='Courses You Teach' />
      <PagePadding>
        {data.getInstructingCourses && (
          data.getInstructingCourses.map(course => (
            <>
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <h4>Playlists</h4>
            </>
          ))
        )}
      </PagePadding>
    </div >
  );
};

export default teacherCourses;