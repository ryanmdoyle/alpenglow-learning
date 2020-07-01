import React from 'react';
import PropTypes from 'prop-types';

import EnrollForm from '../forms/EnrollForm';
import PagePadding from '../styled/blocks/PagePadding';
import PageTitle from '../PageTitle';

const StudentWelcome = ({ user }) => {
  return (
    <>
      <PageTitle>Welcome!</PageTitle>
      <PagePadding>
        <p>
          <strong>Welcome, {user?.firstName}!</strong>
        </p>
        <p>Go get started, first you need to enroll in class. Get a Class Enrollment code from your teacher and enter it below.</p>
        <EnrollForm />
      </PagePadding>
    </>
  );
};

StudentWelcome.propTypes = {
  user: PropTypes.object.isRequired,
}

export default StudentWelcome;