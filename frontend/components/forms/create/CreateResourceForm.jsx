import React, { useContext } from 'react';
import gql from 'graphql-tag';

import FormWrapper from '../../styled/blocks/FormWrapper';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import PagePadding from '../../styled/PagePadding';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { PLAYLIST_QUERY } from '../../../gql/queries';

const CREATE_RESOURCE_MUTATION = gql`
  mutation CREATE_RESOURCE(
    $name: String!,
    $description: String!,
    $href: String!,
    $type: String!,
    $objective: String!,
  ) {
    createResource(
      name: $name,
      description: $description,
      href: $href,
      type: $type,
      objective: $objective,
    ) {
      _id
      name
    }
  }
`;

const CreateResourceForm = ({ objectiveName, objectiveId, playlistId }) => {
  const { register, handleSubmit, errors } = useForm();
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const [addResource, { data }] = useMutation(CREATE_RESOURCE_MUTATION, {
    refetchQueries: [{ query: PLAYLIST_QUERY, variables: { playlistId: playlistId } }],
    onCompleted: (data) => {
      if (modal.isOpen) {
        modal.close();
      }
      alert.success(`Successfully added resource!`)
    },
    onError: (data) => (alert.error(`Ooops, looks like there was a problem. ${data}`)),
  }
  )

  const onSubmit = data => {
    addResource({
      variables: {
        objective: objectiveId,
        ...data
      }
    })
  }

  return (
    <PagePadding>
      <h4>Add Resource to {objectiveName}</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" ref={register({ required: true })} />
          {errors.name && "Name is required"}

          <label htmlFor='description'>description</label>
          <textarea name="description" ref={register({ required: true, maxLength: 255 })} />
          {errors.description?.type === "required" && "Description is required."}
          {errors.description?.type === "maxLength" && "Maximum description length is 255 characters."}

          <label htmlFor='href'>link</label>
          <input name="href" ref={register({ required: true })} />
          {errors.link && 'You must add a href link to the resource!'}

          <label htmlFor='type'>Type</label>
          <select type='radio' name="type" ref={register({ required: true })}>
            <option value='Article'>Article</option>
            <option value='Image'>Image</option>
            <option value='Practice'>Practice</option>
            <option value='Video'>Video</option>
            <option value='Audio'>Audio</option>
          </select>
          {errors.type && 'You must add a resource type to show the class what kind of resource this is.'}

          <button type="submit">Add Resource</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreateResourceForm;