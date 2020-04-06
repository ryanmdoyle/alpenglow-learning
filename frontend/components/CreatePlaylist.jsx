import React from 'react';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import FormWrapper from './styled/FormWrapper';
import PagePadding from './styled/PagePadding';

const CREATE_PLAYLIST = gql`
    mutation CREATE_PLAYLIST(
      $name: String!,
      $subject: String!,
      $grade: Int!,
      $description: String,
    ) {
      createPlaylist(
        name: $name,
        subject: $subject,
        grade: $grade,
        description: $description,
      ) {
        name
      }
    }
  `;

const CreatePlaylist = () => {
  const { register, handleSubmit, errors } = useForm();
  const [createPlaylist, { data }] = useMutation(CREATE_PLAYLIST);

  const onSubmit = data => {
    createPlaylist({
      variables: {
        name: data.name,
        subject: data.subject,
        description: data.description,
        grade: parseInt(data.grade), //has to be int for gql
      }
    })
  };

  return (
    <PagePadding>
      <h2>Create New Playlist</h2>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" ref={register({ required: true })} />

          <label htmlFor='subject'>subject*</label>
          <input type="text" name="subject" ref={register({ required: true })} />

          <label htmlFor='description'>description</label>
          <textarea name="description" ref={register({ maxLength: 255 })} />

          <label htmlFor='grade'>grade*</label>
          <input type="number" name="grade" ref={register({ required: true, max: 12, min: 1 })} />

          <input type="submit" />
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreatePlaylist;