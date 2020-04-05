import React from 'react';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import FormWrapper from './styled/FormWrapper';
import PagePadding from './styled/PagePadding';

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

const CreateCourse = () => {
  const { register, handleSubmit, errors } = useForm();
  const [createCourse, { data }] = useMutation(CREATE_COURSE);

  const onSubmit = data => {
    console.log(data)
    createCourse({ variables: data })
  };

  const testData = {
    name: 'Test Course',
    section: 101,
    subject: "Math",
    grade: 6,
    description: "test description",
    // startDate: Date,
    // endDate: Date,
  }

  return (
    <PagePadding>
      <h2>Create New Course</h2>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="Name" ref={register({ required: true })} />

          <label htmlFor='subject'>subject*</label>
          <input type="text" name="Subject" ref={register({ required: true })} />

          <label htmlFor='grade'>grade*</label>
          <input type="number" name="Grade" ref={register({ required: true, max: 12, min: 1 })} />

          <label htmlFor='section'>section</label>
          <input type="text" name="Section" ref={register} />

          <label htmlFor='description'>description</label>
          <textarea name="Description" ref={register({ maxLength: 255 })} />

          <label htmlFor='startDate'>start Date</label>
          <input type="date" name="Start Date" ref={register} />

          <label htmlFor='endDate'>end Date</label>
          <input type="date" name="End Date" ref={register} />

          <input type="submit" />
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreateCourse;