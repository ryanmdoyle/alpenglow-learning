import React from 'react';

import PageTitle from '../../../../components/PageTitle';
import PagePadding from '../../../../components/styled/blocks/PagePadding';
import ProgressCoursesTable from '../../../../components/progress/ProgressCoursesTable';

const teacherStudents = () => {
  return (
    <>
      <PageTitle>Student Progress</PageTitle>
      <PagePadding>
        <ProgressCoursesTable />
      </PagePadding>
    </>
  );
};

export default teacherStudents;