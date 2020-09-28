import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
import { GET_PLAYLIST } from '../../../gql/queries';

const UPDATE_RESOURCE = gql`
  mutation UPDATE_RESOURCE(
    $resourceId: ID!,
    $name: String!,
    $description: String,
    $type: String!,
    $href: String!,
  ) {
    updateResource(
      resourceId: $resourceId,
      name: $name,
      description: $description,
      type: $type,
      href: $href
    ) {
      _id
    }
  }
`;

const UpdateResourceForm = ({ resourceId, playlistId, name, description, type, href }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);
  const [submitting, setSubmitting] = useState(false);

  const [update, { data: editData }] = useMutation(UPDATE_RESOURCE, {
    refetchQueries: [{ query: GET_PLAYLIST, variables: { playlistId: playlistId } }],
    onCompleted: editData => {
      setSubmitting(false);
      modal.close();
      alert.success(`Sucessfully updated resource!`, 3);
    },
  });

  const onSubmit = data => {
    setSubmitting(true);
    update({
      variables: {
        resourceId: resourceId,
        name: data.name,
        description: data.description,
        type: data.type,
        href: data.href,
      }
    })
  }

  return (
    <PagePadding>
      <h4>Update {name}</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" defaultValue={name} ref={register({ required: true })} />
          {errors.name && "Name is required"}

          <label htmlFor='description'>description</label>
          <textarea name="description" defaultValue={description} ref={register({ maxLength: 255 })} />
          {errors.description?.type === "maxLength" && "Maximum description length is 255 characters."}

          <label htmlFor='href'>link</label>
          <input name="href" defaultValue={href} ref={register({ required: true })} />
          {errors.link && 'You must add a href link to the resource!'}

          <label htmlFor='type'>Type</label>
          <select type='radio' name="type" defaultValue={type} ref={register({ required: true })}>
            <option value='Article'>Article/Text</option>
            <option value='Video'>Video</option>
            <option value='Presentation'>Presentation</option>
            <option value='Practice'>Practice</option>
            <option value='Image'>Image</option>
            <option value='Audio'>Audio</option>
          </select>
          {errors.type && 'You must add a resource type to show the class what kind of resource this is.'}

          <button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Update Resource'}</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

UpdateResourceForm.propTypes = {
  resourceId: PropTypes.string.isRequired,
  playlistId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default UpdateResourceForm;