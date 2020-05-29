import React, { useContext } from 'react';
import { css } from '@emotion/core';
import PageTitle from '../../../components/PageTitle';
import { useQuery } from '@apollo/react-hooks'

import Loading from '../../../components/Loading';
import PagePadding from '../../../components/styled/PagePadding';
import CreateClassForm from '../../../components/forms/CreateClassForm';
import TextButton from '../../../components/styled/elements/TextButton';
import ModalContext from '../../../components/context/ModalContext';
import { INSTRUCTING_COURSES_QUERY } from '../../../gql/queries';

import { TextTableContainer, TextTableHeader, TextTableRow} from '../../../components/styled/tables/TextTable';

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
              <TextTableContainer>
                <TextTableHeader>
                  <span>Class Name</span>
                  <span>Enroll ID</span>
                  <span>Students Enrolled</span>
                </TextTableHeader>
                {course.classes.map(c => {
                  return (
                    <TextTableRow key={c._id}>
                      <span className='first-column'>{c.name}</span>
                      <span>{c.enrollId}</span>
                      <span>{c.enrolled.length}</span>
                    </TextTableRow>
                  )
                })}
              </TextTableContainer>
            )}
            <div css={css`display: flex; justify-content: flex-end;`}>
            <TextButton text={`Add class to ${course.name}`} whenClicked={() => {
                  modal.setChildComponent(<CreateClassForm courseId={course._id} />);
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