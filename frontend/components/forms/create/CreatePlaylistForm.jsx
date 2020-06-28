import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import FormWrapper from '../../styled/blocks/FormWrapper';
import PagePadding from '../../styled/PagePadding';
import Loading from '../../Loading';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import subjects from '../../../lib/subjects';
import { INSTRUCTING_COURSES_QUERY } from '../../../gql/queries';

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
      $description: String,
      $course: String!,
      $type: String!,
    ) {
      createPlaylist(
        name: $name,
        subject: $subject,
        description: $description,
        course: $course,
        type: $type,
      ) {
        name
      }
    }
  `;

const CreatePlaylistForm = ({ course, subject, type }) => {
  const [courseSubject, setCourseSubject] = useState(null);
  const { register, handleSubmit, errors, reset } = useForm();

  // query (not destructured for data name conflicting with query/mutate)
  const query = useQuery(GET_USER_COURSES_QUERY);
  const loading = query.loading;
  const error = query.loading;

  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  const [createPlaylist, { data, client }] = useMutation(CREATE_PLAYLIST_MUTATION, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: INSTRUCTING_COURSES_QUERY }],
    onCompleted: (data) => {
      modal.close();
      alert.success(`Successfully created playlist: ${data.createPlaylist.name}`);
      reset(); //resets form values
    },
    onError: error => {
      alert.error('Sorry, there was an error creating your playlist.');
      console.error(error);
    }
  });

  const onSubmit = data => {
    createPlaylist({
      variables: {
        name: data.name,
        subject: data.subject ? data.subject : subject,
        description: data.description,
        grade: parseInt(data.grade), //has to be int for gql
        course: data.course ? data.course : course,
        type: data.type ? data.type : type.toUpperCase(), // type accepts: ESSENTIAL, CORE, CHALLENGE
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
      {(course && type) ? <h4>Create New {type} Playlist</h4> : <h4>Create New Playlist</h4>}
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>name*</label>
          <input type="text" name="name" ref={register({ required: true })} />

          {!course && (
            query.data && (query.data.getInstructingCourses.length >= 0) && (
              <>
                <label htmlFor='course'>Course*</label>
                <select name='course' ref={register({ required: true })} onChange={() => { onCourseSelect(event.target.value) }}>
                  <option disabled="" value="">Select the Course this Playlist will be in below:</option>
                  {query.data.getInstructingCourses.map((course) => (
                    <option value={course._id} key={course._id}>{course.name}</option>
                  ))}
                </select>
              </>
            )
          )}

          {!subject && (
            <>
              <label htmlFor='subject'>subject*</label>
              <select name='subject' value={courseSubject || ''} ref={register({ required: true })} onChange={() => { setCourseSubject(event.target.value) }}>
                {subjects.map(subject => (
                  <option value={subject} key={subject} >{subject}</option>
                ))}
              </select>
            </>
          )}

          {!type && (
            <>
              <label htmlFor='type'>Type</label>
              <select name="type" ref={register()}>
                <option value='ESSENTIAL'>Essential</option>
                <option value='CORE'>Core</option>
                <option value='CHALLENGE'>Challenge</option>
              </select>
            </>
          )}

          <label htmlFor='description'>description</label>
          <textarea name="description" ref={register({ maxLength: 255 })} />

          <button type='submit'>Create Playlist</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

CreatePlaylistForm.propTypes = {
  course: PropTypes.string,
  subject: PropTypes.string,
  type: PropTypes.string,
}

export default CreatePlaylistForm;