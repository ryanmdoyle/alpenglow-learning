import React, { useContext } from 'react';
import gql from 'graphql-tag';

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { GET_STUDENT_CLASS } from '../../../gql/queries';

const CREATE_TASK = gql`
  mutation CREATE_TASK(
    $description: String!,
    $type: String!,
    $classId: ID,
    $playlistId: ID,
  ) {
    createTask(
      description: $description,
      type: $type,
      classId: $classId,
      playlistId: $playlistId,
    ) {
      _id
    }
  }
`;

const CreateTaskForm = ({ classId, playlistId, taskType }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const [addTask, { data }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_STUDENT_CLASS, variables: { classId: classId } }],
    onCompleted: (data) => {
      if (modal.isOpen) {
        modal.close();
      }
      alert.success(`Successfully added ${taskType}!`)
    },
    onError: (data) => (alert.error(`Ooops, looks like there was a problem. ${data}`)),
  }
  )

  const onSubmit = data => {
    addTask({
      variables: {
        description: data.description,
        type: taskType.toUpperCase(),
        classId: classId || null,
        playlistId: playlistId || null,
      }
    })
  }

  return (
    <PagePadding>
      <h4>Add {taskType}</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='description'>Description</label>
          <textarea name="description" ref={register({ required: true, maxLength: 255 })} />
          {errors.description?.type === "required" && "Description is required."}
          {errors.description?.type === "maxLength" && "Maximum description length is 255 characters."}

          <button type="submit">Add {taskType}</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreateTaskForm;