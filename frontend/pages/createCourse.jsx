import React from 'react';
import CreateCourse from '../components/CreateCourse';
import { withApollo } from '../lib/apollo';

const createCourse = () => {
  return (
    <CreateCourse />
  );
};

export default withApollo({ ssr: false })(createCourse)