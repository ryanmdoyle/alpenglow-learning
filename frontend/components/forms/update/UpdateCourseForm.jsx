import React, { useContext } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/react-hooks';

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
import Loading from '../../Loading';
import gradeLevels from '../../../lib/gradeLevels';
import subjects from '../../../lib/subjects';
import { GET_INSTRUCTING_COURSES } from '../../../gql/queries';

const UPDATE_COURSE = gql`
    mutation UPDATE_COURSE(
      $courseId: ID!,
      $name: String!,
      $subject: String!,
      $grade: Int!,
      $section: String,
      $description: String,
      $startDate: String,
      $endDate: String,
    ) {
      updateCourse(
        courseId: $courseId,
        name: $name,
        subject: $subject,
        grade: $grade,
        section: $section,
        description: $description,
        startDate: $startDate,
        endDate: $endDate,
      ) {
        _id
      }
    }
  `;

const GET_COURSE_DETAILS = gql`
  query GET_COURSE_DETAILS($courseId: ID!) {
    getCourse(courseId: $courseId) {
      name
      subject
      grade
      section
      description
      startDate
      endDate
    }
  }
`;

const UpdateCourseForm = ({ courseId }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const { data: queryData, loading, error } = useQuery(GET_COURSE_DETAILS, {
    variables: { courseId: courseId }
  });

  const [updateCourse, { data }] = useMutation(UPDATE_COURSE, {
    refetchQueries: [
      { query: GET_INSTRUCTING_COURSES },
      { query: GET_COURSE_DETAILS, variables: { courseId: courseId } }
    ],
    onCompleted: (data) => {
      if (modal.isOpen) {
        modal.close();
      }
      alert.success(`Successfully updated course.`)
    },
    onError: (data) => (alert.error(`Ooops, looks like there was a problem. ${data}`)),
  }
  )

  const onSubmit = data => {
    updateCourse({
      variables: {
        courseId: courseId,
        name: data.name,
        subject: data.subject,
        grade: parseInt(data.grade),
        section: data.section,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
      }
    })
  }
  if (loading) return <Loading />

  const { name, subject, grade, section, description, startDate, endDate } = queryData?.getCourse;
  return (
    <PagePadding>
      <h4>Update Playlist Description</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor='name'>name*</label>
          <input type="text" name="name" defaultValue={name} ref={register({ required: true })} />
          {errors.name && 'Course name is required'}

          <label htmlFor='subject'>subject*</label>
          <select name='subject' defaultValue={subject} ref={register({ required: true })}>
            {subjects.map(subject => (
              <option value={subject} key={subject}>{subject}</option>
            ))}
          </select>
          {errors.subject && 'Course subject is required'}

          <label htmlFor='grade'>grade*</label>
          <select name='grade' defaultValue={grade} ref={register({ required: true, max: 12, min: 0 })}>
            <option disabled="" value="">Select grade level below</option>
            {gradeLevels.map(gradeTuple => (
              <option type='number' name='grade' value={gradeTuple[1]} key={gradeTuple[1]}>{gradeTuple[0]}</option>
            ))}
          </select>
          {errors.grade && 'Course grade level is required'}

          <label htmlFor='section'>section</label>
          <input type="text" name="section" defaultValue={section} ref={register} />

          <label htmlFor='description'>description</label>
          <textarea name="description" defaultValue={description} ref={register({ maxLength: 255 })} />
          {errors.description && 'Maximum length is 255.'}

          <label htmlFor='startDate'>start Date</label>
          <input type="date" name="startDate" defaultValue={startDate} ref={register} />

          <label htmlFor='endDate'>end Date</label>
          <input type="date" name="endDate" defaultValue={endDate} ref={register} />

          <button type="submit">Update Description</button>
        </form>
      </FormWrapper>
    </PagePadding >
  );
};

UpdateCourseForm.propTypes = {
  courseId: PropTypes.string.isRequired,
}

export default UpdateCourseForm;