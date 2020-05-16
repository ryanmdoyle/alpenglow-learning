import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import Loading from '../../components/Loading';
import PagePadding from '../../components/styled/PagePadding';
import CreateClass from '../../components/CreateClass';
import PlusButton from '../../components/styled/elements/PlusButton';
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

  if (error) return null;
  if (loading) return <Loading />
  return (
    <div>
      <PageTitle title='Your Classes' />
      <PagePadding>
        {data?.getInstructingCourses?.map(course => (
          <div key={course._id}>
            <h4>{course.name}</h4>
            {course.classes.length === 0 && <PlusButton onClick={() => { toggleNewClassModal(!newClassModal) }} />}
            {course.classes.map(c => (
              <h6 key={c._id}>{c.name}</h6>
            ))}
          </div>
        )
        )}

      </PagePadding>
      {newClassModal && (
        <Modal isOpen={newClassModal} toggle={toggleNewClassModal}>
          <CreateClass />
        </Modal>
      )}
    </div >
  );
};

export default teacherClasses;