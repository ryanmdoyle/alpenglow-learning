import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core'
import { useRouter } from 'next/router';

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { GET_INSTRUCTING_COURSES } from '../../../gql/queries';

const DELETE_CLASS = gql`
  mutation DELETE_CLASS(
    $classId: ID!,
  ) {
    deleteClass(
      classId: $classId,
    ) {
      _id
    }
  }
`;

const DeleteClassForm = ({ classId, name }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);
  const router = useRouter();

  const [deleteClass, { data }] = useMutation(DELETE_CLASS, {
    refetchQueries: [{ query: GET_INSTRUCTING_COURSES }],
    onCompleted: (data) => {
      if (modal.isOpen) {
        modal.close();
      }
      alert.success(`Successfully deleted class!`)
      router.push('/teacher/manage/classes');
    },
    onError: (data) => (alert.error(`Ooops, looks like there was a problem. ${data}`)),
  })

  const onSubmit = data => {
    deleteClass({
      variables: {
        classId: classId,
      }
    })
  }

  return (
    <PagePadding>
      <h4>Delete Class {name}</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span css={css`margin: 0rem 0;`}>Enter Class name below to confirm deletion. This cannot be undone!</span>
          <label htmlFor='name'>Type <span css={css`font-style:italic;color: var(--red);`}>{name} </span>below:</label>
          <input type="text" name="name" ref={register({ validate: value => value.toLowerCase() === name.toLowerCase() })} />
          {errors.name && "Class name is required"}

          <button type="submit" className='delete'>Delete Class</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default DeleteClassForm;