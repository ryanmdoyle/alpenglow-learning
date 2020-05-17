import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import Loading from '../../components/Loading';
import PagePadding from '../../components/styled/PagePadding';
import CreateClass from '../../components/CreateClass';
import PlusButton from '../../components/styled/elements/PlusButton';
import TextButton from '../../components/styled/elements/TextButton';
import Modal from '../../components/styled/Modal';

const INSTRUCTING_COURSES_QUERY = gql`
  query INSTRUCTING_COURSES_QUERY {
    getInstructingCourses {
      _id
      name
      classes {
        _id
        name
      }
    }
  }
`;
// On  this page, show a list of courses, with a button after to add a "class"
const teacherClasses = () => {
  const { loading, error, data } = useQuery(INSTRUCTING_COURSES_QUERY);
  const [newClassModal, toggleNewClassModal] = useState(false);
  const [modalId, setModalId] = useState(null);

  if (error) return null;
  if (loading) return <Loading />
  return (
    <div>
      <PageTitle title='Your Classes' />
      <PagePadding>
        {data?.getInstructingCourses?.map(course => (
          <div key={course._id}>
            <h4>{course.name}</h4>
            {course.classes.length === 0 && (
              <p>You currently don't have any classes enrolled in Math 6. Click below to add your first class!</p>
            )}

            {course.classes.map(c => (
              <p key={c._id}>{c.name}</p>
            ))}
            <TextButton text={`Add class to ${course.name}`} whenClicked={() => {
                  setModalId(course._id);
                  toggleNewClassModal(!newClassModal);
                }}></TextButton>
          </div>
        ))}

      </PagePadding>

      {newClassModal && (
        <Modal isOpen={newClassModal} toggle={toggleNewClassModal}>
          <CreateClass courseId={modalId} />
        </Modal>
      )}

    </div >
  );
};

export default teacherClasses;