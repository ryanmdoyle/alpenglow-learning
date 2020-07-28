import React, { useContext } from 'react';
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../../components/styled/PageTitle';
import PagePadding from '../../../../components/styled/blocks/PagePadding';
import Loading from '../../../../components/Loading';
import TrashCanButton from '../../../../components/styled/elements/TrashCanButton';
import AlertContext from '../../../../components/context/AlertContext';
import ModalContext from '../../../../components/context/ModalContext';
import DeleteStudentForm from '../../../../components/forms/delete/DeleteStudentForm';
import { ListContainer, ListRow } from '../../../../components/styled/blocks/List';
import { GET_INSTRUCTING_STUDENTS, GET_INSTRUCTING_CLASSES } from '../../../../gql/queries';

const studentList = () => {
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const { loading, error, data } = useQuery(GET_INSTRUCTING_STUDENTS, {
    pollInterval: 5000,
  });
  const { data: classesData } = useQuery(GET_INSTRUCTING_CLASSES, {
    pollInterval: 5000,
  });
  // returns one array which contains arrays of enrolled student IDs for each class
  const unpopulatedEnrolledClasses = classesData?.getClassesInstructing.map(aClass => aClass.enrolled.map(student => student._id))

  const trashClick = (studentId, studentName) => {
    modal.setChildComponent(
      <DeleteStudentForm studentId={studentId} studentName={studentName} />
    )
    modal.open();
  }

  if (error) return null;
  if (loading) return <Loading />;
  return (
    <>
      <Head>
        <title>Alpenglow Learning - Manage Students</title>
        <meta name='description' content='Manage Students'></meta>
      </Head>
      <PageTitle>Manage Your Students</PageTitle>
      <PagePadding>
        <h4>All Students Enrolled in Classes</h4>
        {data.getStudentsInstructing.length == 0 && (
          <em>Currently you have no students enrolled in any classes. Once a student enrolls in one of your classes, their information will show here.</em>
        )}
        <ListContainer>
          {data.getStudentsInstructing.map(student => {
            let enrolled = 0;
            if (unpopulatedEnrolledClasses) {
              unpopulatedEnrolledClasses.forEach(classArray => {
                if (classArray.includes(student._id)) {
                  enrolled += 1
                }
              })
            }
            return (
              <ListRow key={student._id}>
                <span>{student.name}</span>
                <span>{student.email}</span>
                <span>{enrolled > 1 ? `${enrolled} classes` : (enrolled == 0 ? 'not enrolled' : `${enrolled} class`)}</span>
                <TrashCanButton onClick={() => { trashClick(student._id, student.name) }} />
              </ListRow>
            )
          })}
        </ListContainer>
      </PagePadding>
    </>
  );
};

export default studentList;