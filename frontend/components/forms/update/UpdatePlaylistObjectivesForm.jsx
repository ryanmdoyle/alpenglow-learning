import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
import { PLAYLIST_QUERY } from '../../../gql/queries';

const UPDATE_OBJECTIVE = gql`
  mutation UPDATE_OBJECTIVE(
    $name: String!,
    $objectiveId: String!,
    $description: String!,
  ) {
    updateObjective(
      name: $name,
      objectiveId: $objectiveId,
      description: $description,
    ) {
      _id
    }
  }
`;

const UpdatePlaylistObjectivesForm = ({ playlistId, objectives }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);
  const [selectedObjective, setSelectedObjective] = useState(null);

  const [updateObjective, { data }] = useMutation(UPDATE_OBJECTIVE, {
    refetchQueries: [{ query: PLAYLIST_QUERY, variables: { playlistId: playlistId } }],
    onCompleted: (data) => {
      if (modal.isOpen) {
        modal.close();
      }
      alert.success(`Successfully updated playlist objectives.`)
    },
    onError: (data) => (alert.error(`Ooops, looks like there was a problem. ${data}`)),
  }
  )

  const onSubmit = data => {
    updateObjective({
      variables: {
        objectiveId: data.objective,
        name: data.name,
        description: data.description,
      }
    })
  }

  const setEditingObjective = (objectiveId) => {
    objectives.forEach(objective => {
      objective._id == objectiveId ? setSelectedObjective(objective) : null;
    })
  }

  return (
    <PagePadding>
      <h4>Update Objective</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor='objective'>Objective to Update</label>
          <select name='objective' onChange={() => { setEditingObjective(event.target.value) }} ref={register({ required: true })}>
            <option disabled="" value="">Select objective to edit:</option>
            {objectives.map(objective => (
              <option value={objective._id} key={objective._id}>{objective.name}</option>
            ))}
          </select>
          {errors.objective && "Course is required"}

          {selectedObjective && (
            <>
              <label htmlFor='name'>name</label>
              <input type="text" name="name" defaultValue={selectedObjective.name} ref={register({ required: true })} />
              {errors.name && "Name is required"}

              <label htmlFor='description'>description</label>
              <textarea name="description" defaultValue={selectedObjective.description} ref={register({ required: true, maxLength: 255 })} />
              {errors.description?.type === "required" && "Description is required."}
              {errors.description?.type === "maxLength" && "Maximum description length is 255 characters."}
            </>
          )}


          <button type="submit">Update Description</button>

        </form>
      </FormWrapper>
    </PagePadding>
  );
};

UpdatePlaylistObjectivesForm.propTypes = {
  playlistId: PropTypes.string.isRequierd,
  objectives: PropTypes.object.isRequired,
}

export default UpdatePlaylistObjectivesForm;