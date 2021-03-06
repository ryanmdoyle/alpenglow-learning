import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
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
  const [submitting, setSubmitting] = useState(false);

  const [addTask, { data }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_STUDENT_CLASS, variables: { classId: classId } }],
    onCompleted: (data) => {
      setSubmitting(false)
      if (modal.isOpen) {
        modal.close();
      }
      alert.success(`Successfully added ${taskType}!`)
    },
    onError: (data) => {
      setSubmitting(false)
      alert.error(`Ooops, looks like there was a problem. ${data}`)
    },
  }
  )

  const onSubmit = data => {
    setSubmitting(true)
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

          <button type="submit" disabled={submitting}>{submitting ? 'Saving...' : `Add ${taskType}`}</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreateTaskForm;