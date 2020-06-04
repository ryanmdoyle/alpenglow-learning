import React from 'react';
import { css } from '@emotion/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../../components/PageTitle';
import Loading from '../../../../components/Loading';
import PagePadding from '../../../../components/styled/PagePadding';

const COURSE_QUERY = gql`
  query COURSE_QUERY {
    getCourse
  }
`;

const manageClass = ({ classId }) => {
  return (
    <>
      {/* <PageTitle>Manage Class</PageTitle>
      <PagePadding>

      </PagePadding> */}
      <p>A class!</p>
    </>
  );
};

export default manageClass;