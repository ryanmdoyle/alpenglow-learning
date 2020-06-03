import React from 'react';
import PropTypes from 'prop-types';

import EnrollForm from '../forms/EnrollForm';

const StudentWelcome = ({ user }) => {
  return (
    <>
      <p>
        <strong>Welcome, {user.firstName}!</strong>
      </p>
      <p>Go get started, first you need to enroll in class. Get a Class Enrollment code from your teacher and enter it below.</p>
      <EnrollForm />
    </>
  );
};

StudentWelcome.propTypes = {
  user: PropTypes.object.isRequired,
}

export default StudentWelcome;