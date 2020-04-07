import React from 'react';
import CreateCourse from '../components/CreateCourse';
import { withApollo } from '../lib/apollo';

import PageTitle from '../components/PageTitle';

const createCourse = () => {
  return (
    <>
      <PageTitle title='Create Course' />
      <CreateCourse />
    </>
  );
};

export default withApollo({ ssr: false })(createCourse)