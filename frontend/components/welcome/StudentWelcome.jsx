import React from 'react';
import PropTypes from 'prop-types';

import EnrollForm from '../forms/EnrollForm';
import PagePadding from '../styled/blocks/PagePadding';
import PageTitle from '../PageTitle';
import Loading from '../Loading';

const StudentWelcome = ({ user }) => {

  if (!user) return <Loading />

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
  user: PropTypes.object,
}

export default StudentWelcome;