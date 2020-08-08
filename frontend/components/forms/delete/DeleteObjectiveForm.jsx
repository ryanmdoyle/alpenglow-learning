import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core'

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { GET_PLAYLIST } from '../../../gql/queries';

const DELETE_OBJECTIVE = gql`
  mutation DELETE_OBJECTIVE(
    $objectiveId: ID!,
  ) {
    deleteObjective(
      objectiveId: $objectiveId,
    ) {
      _id
    }
  }
`;

const DeleteObjectiveForm = ({ objectiveId, objectiveName, playlistId }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const [deleteObjective, { data }] = useMutation(DELETE_OBJECTIVE, {
    refetchQueries: [{ query: GET_PLAYLIST, variables: { playlistId: playlistId } }],
    onCompleted: (data) => {
      if (modal.isOpen) {
        modal.close();
      }
      alert.success(`Successfully deleted objective!`)
    },
    onError: (data) => (alert.error(`Ooops, looks like there was a problem. ${data}`)),
  })

  const onSubmit = data => {
    deleteObjective({
      variables: {
        objectiveId: objectiveId,
        objectiveName: data.name,
      }
    })
  }

  return (
    <>
      <h4>Delete Objective {objectiveName}</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span css={css`margin: 0rem 0;`}>Enter Playlist name below to confirm deletion.</span>
          <label htmlFor='name'>Type <span css={css`font-style:italic;color: var(--red);`}>{objectiveName} </span>below:</label>
          <input type="text" name="name" ref={register({ validate: value => value.toLowerCase() === objectiveName.toLowerCase() })} />
          {errors.name && "Objective name is required"}

          <button type="submit" className='delete'>Delete Objective</button>
        </form>
      </FormWrapper>
    </>
  );
};

export default DeleteObjectiveForm;