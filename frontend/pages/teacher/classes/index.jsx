import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import PageTitle from '../../../components/PageTitle';
import { useQuery } from '@apollo/react-hooks'

import Loading from '../../../components/Loading';
import PagePadding from '../../../components/styled/PagePadding';
import CreateClass from '../../../components/CreateClass';
import TextButton from '../../../components/styled/elements/TextButton';
import ClassTable from '../../../components/ClassInfo';
import ModalContext from '../../../components/context/ModalContext';
import { INSTRUCTING_COURSES_QUERY } from '../../../gql/queries';

const teacherClasses = () => {
  const { loading, error, data } = useQuery(INSTRUCTING_COURSES_QUERY);
  const modal = useContext(ModalContext);

  if (error) return null;
  if (loading) return <Loading />
  return (
    <div>
      <PageTitle>Your Classes</PageTitle>
      <PagePadding>
        {data?.getInstructingCourses?.map(course => (
          <div key={course._id}>
            <h4>{course.name}</h4>
            {course.classes.length === 0 && (
              <p>You currently don't have any classes enrolled in Math 6. Click below to add your first class!</p>
            )}
            {course.classes.length !== 0 && (
              <ClassTable classData={course.classes} />
            )}
            <div css={css`display: flex; justify-content: flex-end;`}>
            <TextButton text={`Add class to ${course.name}`} whenClicked={() => {
                  modal.setChildComponent(<CreateClass courseId={course._id} />);
                  modal.open();
                }}></TextButton>

            </div>
          </div>
        ))}

      </PagePadding>
    </div >
  );
};

export default teacherClasses;