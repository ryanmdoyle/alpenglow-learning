import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';

import FormWrapper from './styled/FormWrapper';
import PagePadding from './styled/PagePadding';
import Loading from './Loading';
import { subjectsEnum } from '../lib/subjectsEnum';
import AlertContext from './context/AlertContext';

const GET_USER_COURSES_QUERY = gql`
  # currently gets all courses, but should later only get courses for logged in user
  query GET_USER_COURSES {
    getInstructingCourses {
      _id
      name
      subject
    }
  }
`;

const CREATE_PLAYLIST_MUTATION = gql`
    mutation CREATE_PLAYLIST(
      $name: String!,
      $subject: String!,
      $grade: Int!,
      $description: String,
      $course: String!,
      $type: String!,
    ) {
      createPlaylist(
        name: $name,
        subject: $subject,
        grade: $grade,
        description: $description,
        course: $course,
        type: $type,
      ) {
        name
      }
    }
  `;

const CreatePlaylist = () => {
  const [courseSubject, setCourseSubject] = useState(null);
  const { register, handleSubmit, errors, reset } = useForm();
  // query (not destructured for data name conflicting with query/mutate)
  const query = useQuery(GET_USER_COURSES_QUERY);
  const loading = query.loading;
  const error = query.loading;

  const alert = useContext(AlertContext);
  const [createPlaylist, { data }] = useMutation(CREATE_PLAYLIST_MUTATION, {
    onCompleted: data => {
      alert.success(`Successfully created playlist: ${data.createPlaylist.name}`);
      reset();
    },
    onError: error => {
      alert.error('Sorry, there was an error creating your playlist.');
    }
  });

  const onSubmit = data => {
    createPlaylist({
      variables: {
        name: data.name,
        subject: data.subject,
        description: data.description,
        grade: parseInt(data.grade), //has to be int for gql
        course: data.course,
        type: data.type, // type accepts: ESSENTIAL, CORE, CHALLENGE
      }
    })
  };

  const onCourseSelect = optionValue => {
    // iterates through courses and sets selectedSubject to subject that matches course with same _id in option selected
    for (let i = 0; i < query.data.getInstructingCourses.length; i++) {
      if (query.data.getInstructingCourses[i]._id === optionValue) {
        setCourseSubject(query.data.getInstructingCourses[i].subject);
      }
    }
  }

  if (loading) return <Loading />;
  return (
    <PagePadding>
      <h3>Create New Playlist</h3>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" ref={register({ required: true })} />

          {query.data && (query.data.getInstructingCourses.length >= 0) && (
            <>
              <label htmlFor='course'>Course</label>
              <select name='course' ref={register} onChange={() => { onCourseSelect(event.target.value) }}>
                <option disabled="" value="">Select the Course this Playlist will be in below:</option>
                {query.data.getInstructingCourses.map((course) => (
                  <option value={course._id} key={course._id}>{course.name}</option>
                ))}
              </select>
            </>
          )}

          <label htmlFor='subject'>subject*</label>
          <select name='subject' value={courseSubject || ''} ref={register({ required: true })} onChange={() => { setCourseSubject(event.target.value) }}>
            {subjectsEnum.map(subject => (
              <option value={subject} key={subject} >{subject}</option>
            ))}
          </select>

          <label htmlFor='type'>Type</label>
          <select name="type" ref={register()}>
            <option value='ESSENTIAL'>Essential</option>
            <option value='CORE'>Core</option>
            <option value='CHALLENGE'>Challenge</option>
          </select>

          <label htmlFor='description'>description</label>
          <textarea name="description" ref={register({ maxLength: 255 })} />

          <label htmlFor='grade'>grade*</label>
          <input type="number" name="grade" ref={register({ required: true, max: 12, min: 1 })} />

          <button type='submit'>Create Playlist</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

export default CreatePlaylist;