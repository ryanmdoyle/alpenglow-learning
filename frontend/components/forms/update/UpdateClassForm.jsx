import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import FormWrapper from '../../styled/blocks/FormWrapper';
import PagePadding from '../../styled/PagePadding';
import Loading from '../../Loading';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import { INSTRUCTING_CLASSES_QUERY } from '../../Nav/NavStudentProgress';
import { GET_INSTRUCTING_COURSES } from '../../../gql/queries';

const UPDATE_CLASS = gql`
    mutation UPDATE_CLASS(
      $name: String,
      $courseId: ID!,
      $classId: ID!,
    ) {
      updateClass(
        name: $name,
        courseId: $courseId,
        classId: $classId,
      ) {
        name
      }
    }
  `;

const UpdateClassForm = ({ classId, courseId, name }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const alert = useContext(AlertContext)
  const modal = useContext(ModalContext);

  const courseQuery = useQuery(GET_INSTRUCTING_COURSES)
  const [updateClass, { data }] = useMutation(UPDATE_CLASS, {
    refetchQueries: [{ query: INSTRUCTING_CLASSES_QUERY }, { query: GET_INSTRUCTING_COURSES }],
    onCompleted: data => {
      reset();
      modal.close();
      alert.success(`Successfully updated class ${data.updateClass.name}!`, 10);
    },
    onError: (error) => {
      alert.error('Sorry, there was a problem updating your class.');
      console.log(error);
    }
  });

  const onSubmit = data => {
    updateClass({
      variables: {
        classId: classId,
        name: data.name,
        courseId: data.courseId || courseId,
      }
    })

  };

  if (courseQuery.loading) return <Loading />;

  const currentCourse = courseQuery?.data?.getInstructingCourses.filter(course => course._id == courseId)[0]
  return (
    <PagePadding>
      <h4>Update Class</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" defaultValue={name} ref={register({ required: true })} />
          {errors.name && 'Class name is required'}

          <label htmlFor='courseId'>course*</label>
          <select name='courseId' ref={register({ required: true })}>
            <option value={currentCourse._id}>{currentCourse.name}</option>
            {courseQuery.data.getInstructingCourses.filter(course => course._id != courseId).map(course => (
              <option value={course._id} key={course._id}>{course.name}</option>
            ))}
          </select>
          {errors.courseId && 'Class course is required. If course is not available, make sure you created the course first!'}

          <button type='submit'>Update Class</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

UpdateClassForm.propTypes = {
  courseId: PropTypes.string,
}

export default UpdateClassForm;