import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import PagePadding from '../../../components/styled/PagePadding';

const manage = () => {
  return (
    <>
      <PageTitle>Manage Students</PageTitle>
      <PagePadding>

        <p>Manage all students here (emails, parents data, etc.)</p>
      </PagePadding>
    </>
  );
};

export default manage;