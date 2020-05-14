import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';

import FormWrapper from './styled/FormWrapper';
import PagePadding from './styled/PagePadding';
import Loading from './Loading';
import AlertContext from './context/AlertContext';
import { INSTRUCTING_COURSES_QUERY } from '../gql/queries';

const CREATE_OBJECTIVE_MUTATION = gql`
  mutation CREATE_OBJECTIVE(
    $name: String!,
    $subject: String!,
    $description: String!,
    $grade: Int!,
  ) {
    createObjective(
      name: $name,
      subject: $subject,
      description: $description,
      grade: $grade,
    ) {
      _id
    }
  }
`;

const CreateObjective = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [coursePlaylists, setCoursePlaylists] = useState(null);
  const alert = useContext(AlertContext);

  const courseQuery = useQuery(INSTRUCTING_COURSES_QUERY);
  // const playlistQuery = useQuery(INSTRUCTING_PLAYLISTS_QUERY);

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
        subject: data.subject,
        description: data.description,
        grade: parseInt(data.grade), //has to be int for gql
      }
    })
  };

  const extractCoursePlaylists = id => {
    const { getInstructingCourses } = courseQuery.data;
    for (let i = 0; i < getInstructingCourses.length; i++) {
      if (getInstructingCourses[i]._id === id) setCoursePlaylists(getInstructingCourses[i].playlists)
    }
  }

  return (
    <PagePadding>
      <h3>Create New Objective</h3>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" ref={register({ required: true })} />

          {courseQuery.data && (
            <>
              <label htmlFor='course'>Course*</label>
              <select name='course' onChange={(event) => { extractCoursePlaylists(event.target.value) }} ref={register({ required: true })}>
                <option disabled="" value="">Select the Course this objective will be in:</option>
                {courseQuery.data.getInstructingCourses.map(course => (
                  <option value={course._id} key={course._id}>{course.name}</option>
                ))}
              </select>
            </>
          )}

          {coursePlaylists && (coursePlaylists.length > 0) ?
            <>
              <label htmlFor='course'>Playlist*</label>
              <select name='playlist' ref={register({ required: true })}>
                <option disabled="" value="">Select the Playlist this objective will be in:</option>
                {coursePlaylists.map(playlist => (
                  <option value={playlist._id} key={playlist._id}>{playlist.name}</option>
                ))}
              </select>
            </> :
            (coursePlaylists && <p>No playlists in course.  Please create playlist first</p>)
          }

          <label htmlFor='description'>description</label>
          <textarea name="description" ref={register({ required: true, maxLength: 255 })} />

          <button type='submit'>Create Objective</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreateObjective;