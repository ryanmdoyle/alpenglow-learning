import React, { useContext } from 'react';
import Head from 'next/head';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks'
import {useRouter} from 'next/router';

import PageTitle from '../../../../components/styled/PageTitle';
import Loading from '../../../../components/Loading';
import PagePadding from '../../../../components/styled/blocks/PagePadding';
import CreateClassForm from '../../../../components/forms/create/CreateClassForm';
import TextButton from '../../../../components/styled/elements/TextButton';
import ModalContext from '../../../../components/context/ModalContext';
import { GET_INSTRUCTING_COURSES } from '../../../../gql/queries';

import { TextTableContainer, TextTableHeader, TextTableRow} from '../../../../components/styled/tables/TextTable';

const teacherClasses = () => {
  const { loading, error, data } = useQuery(GET_INSTRUCTING_COURSES, {
    pollInterval: 10000,
  });
  const modal = useContext(ModalContext);
  const router = useRouter();

  const handleLink = (classId) => {
    if (event.target.className != 'enrollId') {
      router.push(`/teacher/manage/classes/${classId}`)
    }
  }

  if (error) return null;
  if (loading) return <Loading />
  return (
    <div>
      <Head>
        <title>Alpenglow Learning - Manage Class</title>
        <meta name='description' content='Class Management'></meta>
      </Head>
      <PageTitle>Manage Your Classes</PageTitle>
      <PagePadding>
        {data?.getCoursesInstructing?.map(course => {
          const classesInCourse = data.getClassesInstructing.filter(clas => clas.course._id == course._id)
          return (
            <div key={course._id}>
              <h4>{course.name}</h4>
              {classesInCourse.length === 0 && (
                <em>You currently don't have any classes enrolled in {course.name}. Click below to add your first class!</em>
              )}
              {classesInCourse.length !== 0 && (
                <TextTableContainer>
                  <TextTableHeader>
                    <span>Class</span>
                    <span>Enroll ID</span>
                    <span>Students Enrolled</span>
                  </TextTableHeader>
                  {classesInCourse.map(c => {
                    return (
                        <TextTableRow key={c._id} onClick={() => {handleLink(c._id)}}>
                          <span className='first-column'>{c.name}</span>
                          <span className='enrollId'>{c.enrollId}</span>
                          <span>{c.enrolled.length}</span>
                      </TextTableRow>
                    )
                  })}
                </TextTableContainer>
              )}
              <div css={css`display: flex; justify-content: flex-end;`}>
              <TextButton onClick={() => {
                    modal.setChildComponent(<CreateClassForm courseId={course._id} />);
                    modal.open();
                  }}>{`Add class to ${course.name}`}</TextButton>

              </div>
            </div>
          )
        })}

      </PagePadding>
    </div >
  );
};

export default teacherClasses;