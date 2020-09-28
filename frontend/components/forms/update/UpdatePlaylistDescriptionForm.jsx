import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
import { GET_PLAYLIST } from '../../../gql/queries';

const UPDATE_PLAYLIST_DESCRIPTION = gql`
  mutation UPDATE_PLAYLIST_DESCRIPTION(
    $playlistId: String!,
    $description: String!,
  ) {
    updatePlaylistDescription(
      playlistId: $playlistId,
      description: $description,
    ) {
      _id
    }
  }
`;

const UpdatePlaylistDescriptionForm = ({ playlistId }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);
  const [submitting, setSubmitting] = useState(false);

  const [updateDescription, { data }] = useMutation(UPDATE_PLAYLIST_DESCRIPTION, {
    refetchQueries: [{ query: GET_PLAYLIST, variables: { playlistId: playlistId } }],
    onCompleted: (data) => {
      setSubmitting(false);
      if (modal.isOpen) {
        modal.close();
      }
      alert.success(`Successfully updated playlist description.`)
    },
    onError: (data) => {
      setSubmitting(false);
      alert.error(`Ooops, looks like there was a problem. ${data}`)
    },
  }
  )

  const onSubmit = data => {
    setSubmitting(true);
    updateDescription({
      variables: {
        playlistId: playlistId,
        description: data.description,
      }
    })
  }

  return (
    <PagePadding>
      <h4>Update Playlist Description</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor='description'>description</label>
          <textarea name="description" ref={register({ required: true, maxLength: 255 })} />
          {errors.description?.type === "required" && "Description is required."}
          {errors.description?.type === "maxLength" && "Maximum description length is 255 characters."}

          <button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Update Description'}</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

UpdatePlaylistDescriptionForm.propTypes = {
  playlistId: PropTypes.string.isRequierd,
}

export default UpdatePlaylistDescriptionForm;