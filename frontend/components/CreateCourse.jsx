import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import FormWrapper from './styled/FormWrapper';
import PagePadding from './styled/PagePadding';
import Loading from './Loading';
import { subjectsEnum } from '../lib/subjectsEnum';
import AlertContext from './context/AlertContext';

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
  const context = useContext(AlertContext)
  const [createCourse, { data }] = useMutation(CREATE_COURSE, {
    onCompleted: data => {
      context.setAlertText(`Successfully created course ${data.createCourse.name}!`);
      context.success(); // put the alert text inside of the success/error methods!
    },
    onError: data => {
      context.setAlertText(`Beep-boop-beep....Error creating course.`);
      context.error();
    }
  });

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
      <h3>Create New Course</h3>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" ref={register({ required: true })} />
          {errors.name && 'Course name is required'}

          <label htmlFor='subject'>subject*</label>
          <select name='subject' ref={register({ required: true })}>
            <option disabled="" value="">Select one of the Options Below</option>
            {subjectsEnum.map(subject => (
              <option value={subject} key={subject}>{subject}</option>
            ))}
          </select>
          {errors.subject && 'Course subject is required'}

          <label htmlFor='grade'>grade*</label>
          <input type="number" name="grade" ref={register({ required: true, max: 12, min: 1 })} />
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

export default CreateCourse;