import React from 'react';
import { css } from '@emotion/core';

import PageTitle from '../../../../components/PageTitle';
import PagePadding from '../../../../components/styled/PagePadding';
import ClassProgressTable from '../../../../components/progress/classProgress/ClassProgressTable';

const classProgress = () => {
  return (
    <div>
      <PageTitle>The Class</PageTitle>
      <PagePadding>
        <ClassProgressTable />
      </PagePadding>
    </div>
  );
};

export default classProgress;