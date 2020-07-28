import React, { useContext } from 'react';
import Head from 'next/head';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../components/styled/PageTitle';
import Loading from '../../../components/Loading';
import CourseTimelines from '../../../components/courses/CourseTimelines';
import PlusButtonWithText from '../../../components/styled/elements/PlusButtonWithText';
import AlertContext from '../../../components/context/AlertContext';
import ModalContext from '../../../components/context/ModalContext';
import CreateCourseForm from '../../../components/forms/create/CreateCourseForm';
import { GET_INSTRUCTING_COURSES } from '../../../gql/queries';

const add = css`
  width: 100%;
  padding: 2rem;
`;

const teacherCourses = () => {
  const { loading, error, data } = useQuery(GET_INSTRUCTING_COURSES);
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const addCourse = () => {
    modal.setChildComponent(
      <CreateCourseForm />
    )
    modal.open();
  }

  if (error) return null;
  if (loading) return <Loading />;
  return (
    <>
      <Head>
        <title>Alpenglow Learning - Manage Courses</title>
        <meta name='description' content='Manage Courses'></meta>
      </Head>
      <PageTitle>Manage Course Curriculum</PageTitle>
      {data.getCoursesInstructing && (
        data.getCoursesInstructing.map(course => (
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
      <div css={add}>
        <h4>Add Course</h4>
        <PlusButtonWithText onClick={addCourse}>Create a New Course</PlusButtonWithText>
      </div>
    </>
  );
};

export default teacherCourses;