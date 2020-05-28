import React, { useContext } from 'react';

import EnrollForm from '../../components/forms/EnrollForm';
import PageTitle from '../../components/PageTitle';

const enroll = () => {
  return (
    <div>
      <PageTitle>Welcome To Alpenglow</PageTitle>
      <EnrollForm />
    </div>
  );
};

export default enroll;