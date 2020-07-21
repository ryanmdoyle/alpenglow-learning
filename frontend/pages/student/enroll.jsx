import React, { useContext } from 'react';

import EnrollForm from '../../components/forms/EnrollForm';
import PageTitle from '../../components/styled/PageTitle';

const enroll = () => {
  return (
    <div>
      <PageTitle>Add A New Class!</PageTitle>
      <EnrollForm />
    </div>
  );
};

export default enroll;