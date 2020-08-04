import React, { useContext } from 'react';

import CreateCourseContributorForm from '../forms/create/CreateCourseContributorForm';
import UpdateCourseForm from '../forms/update/UpdateCourseForm';
import DeleteCourseForm from '../forms/delete/DeleteCourseForm';
import CourseContributors from './CourseContributors';
import UserContext from '../context/UserContext';

const CourseManagement = ({ courseId, courseName, owner }) => {
  const user = useContext(UserContext);

  return (
    <>
      <UpdateCourseForm courseId={courseId} />
      <CourseContributors courseId={courseId} />
      <CreateCourseContributorForm courseId={courseId} />
      {(user._id == owner) && (
        <DeleteCourseForm courseId={courseId} courseName={courseName} />
      )}
    </>
  );
};

export default CourseManagement;