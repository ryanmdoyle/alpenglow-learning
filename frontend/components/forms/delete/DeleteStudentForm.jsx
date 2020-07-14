import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core'

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { GET_INSTRUCTING_STUDENTS } from '../../../gql/queries';

const DELETE_STUDENT = gql`
  mutation DELETE_STUDENT($studentId: ID!) {
    deleteStudent(studentId: $studentId) {
      _id
    }
  }
`;

const DeleteStudentForm = ({ studentId, studentName }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const [deleteStudent, { data }] = useMutation(DELETE_STUDENT, {
    refetchQueries: [{ query: GET_INSTRUCTING_STUDENTS }],
    onCompleted: (data) => {
      if (modal.isOpen) {
        modal.close();
      }
      alert.success(`Successfully removed student!`)
    },
    onError: (data) => (alert.error(`Ooops, looks like there was a problem. ${data}`)),
  })

  const onSubmit = data => {
    deleteStudent({
      variables: {
        studentId: studentId,
      }
    })
  }

  return (
    <PagePadding>
      <h4>Remove Student {studentName}</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span css={css`margin: 0rem 0;`}>Enter student name below to confirm removal. This will remove the student from all of your classes. This cannot be undone!</span>
          <label htmlFor='name'>Type <span css={css`font-style:italic;color: var(--red);`}>{studentName} </span>below:</label>
          <input type="text" name="name" ref={register({ validate: value => value.toLowerCase() === studentName.toLowerCase() })} />
          {errors.name && "Student name is required"}

          <button type="submit" className='delete'>Remove Student From All Classes</button>
          <br></br>
          <em>If you wish to completely delete this student and remove their account, contact the administrator.</em>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default DeleteStudentForm;