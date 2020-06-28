import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import FormWrapper from '../../styled/blocks/FormWrapper';
import PagePadding from '../../styled/PagePadding';
import AlertContext from '../../context/AlertContext';
import gradeLevels from '../../../lib/gradeLevels';
import subjects from '../../../lib/subjects';
import { GET_INSTRUCTING_COURSES } from '../../../gql/queries';

const CREATE_COURSE = gql`
    mutation CREATE_COURSE(
      $name: String!,
      $subject: String!,
      $grade: Int!,
      $section: String,
      $description: String,
      $startDate: String,
      $endDate: String,
    ) {
      createCourse(
        name: $name,
        subject: $subject,
        grade: $grade,
        section: $section,
        description: $description,
        startDate: $startDate,
        endDate: $endDate,
      ) {
        name
      }
    }
  `;

const CreateCourseForm = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const alert = useContext(AlertContext)

  const [createCourse, { data }] = useMutation(CREATE_COURSE, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_INSTRUCTING_COURSES }],
    onCompleted: data => {
      reset();
      alert.success(`Successfully created course ${data.createCourse.name}!`, 10);
    },
    onError: () => {
      alert.error('Sorry, there was a problem creating your course.');
    }
  });

  const onSubmit = (data, e) => {
    createCourse({
      variables: {
        name: data.name,
        subject: data.subject,
        grade: parseInt(data.grade), //has to be int for gql
        section: data.section,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
      }
    })
  };

  return (
    <PagePadding>
      <h4>Create New Course</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" ref={register({ required: true })} />
          {errors.name && 'Course name is required'}

          <label htmlFor='subject'>subject*</label>
          <select name='subject' ref={register({ required: true })}>
            <option disabled="" value="">Select one of the Options Below</option>
            {subjects.map(subject => (
              <option value={subject} key={subject}>{subject}</option>
            ))}
          </select>
          {errors.subject && 'Course subject is required'}

          <label htmlFor='grade'>grade*</label>
          <select name='grade' ref={register({ required: true, max: 12, min: 0 })}>
            <option disabled="" value="">Select grade level below</option>
            {gradeLevels.map(gradeTuple => (
              <option type='number' name='grade' value={gradeTuple[1]} key={gradeTuple[1]}>{gradeTuple[0]}</option>
            ))}
          </select>
          {errors.grade && 'Course grade level is required'}

          <label htmlFor='section'>section</label>
          <input type="text" name="section" ref={register} />

          <label htmlFor='description'>description</label>
          <textarea name="description" ref={register({ maxLength: 255 })} />
          {errors.description && 'Maximum length is 255.'}

          <label htmlFor='startDate'>start Date</label>
          <input type="date" name="startDate" ref={register} />

          <label htmlFor='endDate'>end Date</label>
          <input type="date" name="endDate" ref={register} />

          <button type='submit'>Create Course</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreateCourseForm;