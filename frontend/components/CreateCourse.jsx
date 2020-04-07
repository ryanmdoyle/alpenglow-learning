import React from 'react';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import FormWrapper from './styled/FormWrapper';
import PagePadding from './styled/PagePadding';
import { subjectsEnum } from '../lib/subjectsEnum';

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
      <h2>Create New Course</h2>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" ref={register({ required: true })} />

          <label htmlFor='subject'>subject*</label>
          <select name='subject' ref={register({ required: true })}>
            {subjectsEnum.map(subject => (
              <option value={subject} key={subject}>{subject}</option>
            ))}
          </select>

          <label htmlFor='grade'>grade*</label>
          <input type="number" name="grade" ref={register({ required: true, max: 12, min: 1 })} />

          <label htmlFor='section'>section</label>
          <input type="text" name="section" ref={register} />

          <label htmlFor='description'>description</label>
          <textarea name="description" ref={register({ maxLength: 255 })} />

          <label htmlFor='startDate'>start Date</label>
          <input type="date" name="startDate" ref={register} />

          <label htmlFor='endDate'>end Date</label>
          <input type="date" name="endDate" ref={register} />

          <input type="submit" />
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreateCourse;