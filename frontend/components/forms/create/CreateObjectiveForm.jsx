import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

import FormWrapper from '../../styled/blocks/FormWrapper';
import PagePadding from '../../styled/PagePadding';
import Loading from '../../Loading';
import AlertContext from '../../context/AlertContext';
import { GET_INSTRUCTING_COURSES } from '../../../gql/queries';

const CREATE_OBJECTIVE_MUTATION = gql`
  mutation CREATE_OBJECTIVE(
    $name: String!,
    $playlist: String!,
    $description: String!,
  ) {
    createObjective(
      name: $name,
      playlist: $playlist,
      description: $description,
    ) {
      _id
      name
    }
  }
`;

const CreateObjectiveForm = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [coursePlaylists, setCoursePlaylists] = useState(null);
  const alert = useContext(AlertContext);
  const courseQuery = useQuery(GET_INSTRUCTING_COURSES);

  const [createObjective, { data }] = useMutation(CREATE_OBJECTIVE_MUTATION, {
    onCompleted: data => {
      alert.success(`Successfully created objective: ${data.createObjective.name}`);
      reset();
    },
    onError: data => {
      alert.error('Sorry, there was a problem creating your objective.', 10);
      console.error(data);
    }
  });

  const onSubmit = data => {
    createObjective({
      variables: {
        name: data.name,
        playlist: data.playlist,
        description: data.description,
      }
    })
  };

  const extractCoursePlaylists = id => {
    const { getCoursesInstructing } = courseQuery.data;
    for (let i = 0; i < getCoursesInstructing.length; i++) {
      if (getCoursesInstructing[i]._id === id) setCoursePlaylists(getCoursesInstructing[i].playlists)
    }
  }

  return (
    <PagePadding>
      <h4>Create New Objective</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" ref={register({ required: true })} />
          {errors.name && "Name is required"}

          {courseQuery.data && (
            <>
              <label htmlFor='course'>Course*</label>
              <select name='course' onChange={(event) => { extractCoursePlaylists(event.target.value) }} ref={register({ required: true })}>
                <option disabled="" value="">Select the Course this objective will be in:</option>
                {courseQuery.data.getCoursesInstructing.map(course => (
                  <option value={course._id} key={course._id}>{course.name}</option>
                ))}
              </select>
              {errors.course && "Course is required"}
            </>
          )}

          {coursePlaylists && (coursePlaylists.length > 0) ?
            <>
              <label htmlFor='playlist'>Playlist*</label>
              <select name='playlist' ref={register({ required: true })}>
                <option disabled="" value="">Select the Playlist this objective will be in:</option>
                {coursePlaylists.map(playlist => (
                  <option value={playlist._id} key={playlist._id}>{playlist.name}</option>
                ))}
              </select>
              {errors.playlist && "Course is required"}
            </> :
            (coursePlaylists && <p>No playlists in course.  Please create playlist first</p>)
          }
          <h1>PLAYLIST BROKEN FIX LATER</h1>
          <label htmlFor='description'>description</label>
          <textarea name="description" ref={register({ required: true, maxLength: 255 })} />
          {errors.description?.type === "required" && "Description is required."}
          {errors.description?.type === "maxLength" && "Maximum description length is 255 characters."}

          <button type='submit'>Create Objective</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreateObjectiveForm;