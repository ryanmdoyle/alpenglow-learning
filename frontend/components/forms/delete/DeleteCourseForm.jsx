import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core'

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { GET_INSTRUCTING_COURSES } from '../../../gql/queries';

const DELETE_COURSE = gql`
  mutation DELETE_COURSE(
    $courseId: ID!,
  ) {
    deleteCourse(
      courseId: $courseId,
    ) {
      _id
    }
  }
`;

const DeleteCourseForm = ({ courseId, courseName }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const [deleteCourse, { data }] = useMutation(DELETE_COURSE, {
    refetchQueries: [{ query: GET_INSTRUCTING_COURSES }],
    onCompleted: (data) => {
      if (modal.isOpen) {
        modal.close();
      }
      alert.success(`Successfully deleted course!`)
    },
    onError: (data) => (alert.error(`Ooops, looks like there was a problem. ${data}`)),
  })

  const onSubmit = data => {
    deleteCourse({
      variables: {
        courseId: courseId,
      }
    })
  }

  return (
    <PagePadding>
      <h4>Delete Course {courseName}</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span css={css`margin: 0rem 0;`}>Enter Course name below to confirm deletion. This cannot be undone!</span>
          <label htmlFor='name'>Type <span css={css`font-style:italic;color: var(--red);`}>{courseName} </span>below:</label>
          <input type="text" name="name" ref={register({ validate: value => value.toLowerCase() === courseName.toLowerCase() })} />
          {errors.name && "Course name is required"}

          <button type="submit" className='delete'>Delete Course</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default DeleteCourseForm;