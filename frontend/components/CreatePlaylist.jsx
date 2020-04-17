import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';

import FormWrapper from './styled/FormWrapper';
import PagePadding from './styled/PagePadding';
import Loading from './Loading';
import { subjectsEnum } from '../lib/subjectsEnum';

const GET_USER_COURSES_QUERY = gql`
  # currently gets all courses, but should later only get courses for logged in user
  query GET_USER_COURSES {
    getCourses {
      _id
      name
    }
  }
`;

const CREATE_PLAYLIST_MUTATION = gql`
    mutation CREATE_PLAYLIST(
      $name: String!,
      $subject: String!,
      $grade: Int!,
      $description: String,
      $courses: String,
    ) {
      createPlaylist(
        name: $name,
        subject: $subject,
        grade: $grade,
        description: $description,
        courses: $courses,
      ) {
        name
      }
    }
  `;

const CreatePlaylist = () => {
  const { register, handleSubmit, errors } = useForm();
  // query (not destructured for data name conflicting with query/mutate)
  const query = useQuery(GET_USER_COURSES_QUERY);
  const loading = query.loading;
  const error = query.loading;

  const [createPlaylist, { data }] = useMutation(CREATE_PLAYLIST_MUTATION);

  const onSubmit = data => {
    createPlaylist({
      variables: {
        name: data.name,
        subject: data.subject,
        description: data.description,
        grade: parseInt(data.grade), //has to be int for gql
        courses: data.courses,
      }
    })
  };
  if (loading) return <Loading />;
  return (
    <PagePadding>
      <h3>Create New Playlist</h3>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" ref={register({ required: true })} />

          <label htmlFor='subject'>subject*</label>
          <select name='subject' ref={register({ required: true })}>
            {subjectsEnum.map(subject => (
              <option value={subject} key={subject}>{subject}</option>
            ))}
          </select>

          <label htmlFor='description'>description</label>
          <textarea name="description" ref={register({ maxLength: 255 })} />

          <label htmlFor='grade'>grade*</label>
          <input type="number" name="grade" ref={register({ required: true, max: 12, min: 1 })} />

          {query.data && (query.data.getCourses.length >= 0) && (
            <>
              <label htmlFor='courses'>Course</label>
              <select name='courses' ref={register}>
                {query.data.getCourses.map((course) => (
                  <option value={course._id} key={course._id}>{course.name}</option>
                ))}
              </select>
            </>
          )}

          <button type='submit'>Create Playlist</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreatePlaylist;