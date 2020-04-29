import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import FormWrapper from './styled/FormWrapper';
import PagePadding from './styled/PagePadding';
import Loading from './Loading';
import { subjectsEnum } from '../lib/subjectsEnum';
import AlertContext from './context/AlertContext';

const TEACHER_COURSES_QUERY = gql`
  query TEACHER_COURSES_QUERY {
    getTeachingCourses {
      _id
      name
    }
  }
`;

const CREATE_CLASS = gql`
    mutation CREATE_CLASS(
      $name: String!,
      $course: String!,
    ) {
      createClass(
        name: $name,
        course: $course,
      ) {
        name
      }
    }
  `;

const CreateClass = () => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext)

  const courseQuery = useQuery(TEACHER_COURSES_QUERY)
  const [createClass, { data }] = useMutation(CREATE_CLASS, {
    onCompleted: data => {
      alert.success(`Successfully created course ${data.createClass.name}!`, 10);
    },
    onError: (error) => {
      alert.error('Sorry, there was a problem creating your class.');
      console.log(error);
    }
  });

  const onSubmit = data => {
    createClass({
      variables: {
        name: data.name,
        course: data.course,
      }
    })

  };

  if (courseQuery.loading) return <Loading />;
  return (
    <PagePadding>
      <h3>Create New Class</h3>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" ref={register({ required: true })} />
          {errors.name && 'Class name is required'}

          <label htmlFor='course'>course*</label>
          <select name='course' ref={register({ required: true })}>
            <option disabled="" value="">Select the course this class is a part of:</option>
            {courseQuery.data.getTeachingCourses.map(course => (
              <option value={course._id} key={course._id}>{course.name}</option>
            ))}
          </select>
          {errors.course && 'Class course is required. If course is not available, make sure you created the course first!'}

          <button type='submit'>Create Class</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreateClass;