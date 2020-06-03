import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import CreateCourseForm from '../forms/CreateCourseForm';

const TeacherWelcome = ({ user }) => {
  return (
    <>
      <h3>Getting Started</h3>
      <div css={css`padding-left: 1rem;`}>
        <p>
          <strong>Welcome, {user.firstName}!</strong>
        </p>
        <p>I'm happy you've chosen Alpenglow for managing your self-guided classroom instruction! To get started, first you will need to create a course.  You can find a form to create your first course at the end of this short tutorial!</p>
      </div>
      <h4>Creating Curriculum</h4>
      <h5>Courses</h5>
      <p>A course is where all of your curriculum is kept and maintained. Every course can have multiple groups of students that are enrolled, so you can easily manage different groups of students if you want to create grouping or naturally have multiple groups of students as a secondary teacher. For student to enroll in a course, you must create a "Class".  A Class is what student will actually enroll in.</p>
      <h5>Classes</h5>
      <p>Classes are grouping of students, each class being enrolled in a specific course you have created. If you were an elementary teacher, you would most likely have a single class enrolled into each course you have. If you were a secondary teacher you would most likely have multiple classes enrolled in a single course.  In order to manage groups of students, you first have to create a Course. Once you have at least one course created, you can being making Classes that are going to "take" the courses you have made.</p>
      {/* <CreateCourseForm /> */}
    </>
  );
};

TeacherWelcome.propTypes = {
  user: PropTypes.object.isRequired,
}

export default TeacherWelcome;