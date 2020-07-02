import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import FormWrapper from '../../styled/blocks/FormWrapper';
import PagePadding from '../../styled/PagePadding';
import Loading from '../../Loading';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import { INSTRUCTING_CLASSES_QUERY } from '../../Nav/NavStudentProgress';
import { GET_INSTRUCTING_COURSES } from '../../../gql/queries';

const MANAGE_QUIZ = gql`
  mutation MANAGE_QUIZ(
    $playlistId: ID!,
    $type: String!,
    $externalLink: String!,
  ) {
    manageQuiz(
      playlistId: $playlistId,
      type: $type,
      externalLink: $externalLink,
    ) {
      _id
    }
  }
`;

const CreateQuizForm = ({ playlistId }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const alert = useContext(AlertContext)
  const modal = useContext(ModalContext);

  const [manageQuiz, { data }] = useMutation(MANAGE_QUIZ, {
    // awaitRefetchQueries: true,
    // refetchQueries: [{ query: INSTRUCTING_CLASSES_QUERY }, { query: GET_INSTRUCTING_COURSES }],
    onCompleted: data => {
      reset();
      modal.close();
      alert.success(`Successfully updated quiz!`, 10);
    },
    onError: (error) => {
      alert.error('Sorry, there was a problem updating the quiz.');
    }
  });

  const onSubmit = data => {
    console.log('submit', playlistId)
    manageQuiz({
      variables: {
        playlistId: playlistId,
        type: data.type || "EXTERNAL",
        externalLink: data.externalLink,
      }
    })
  };

  // if (courseQuery.loading) return <Loading />;
  return (
    <PagePadding>
      <h4>Manage Quiz {playlistId}</h4>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* <label htmlFor='type'>Quiz Type*</label>
          <select name='type' ref={register({ required: true })}>
            <option value='EXTERNAL' key='EXTERNAL'>External</option>
            <option value='CREATED' key='CREATED'>Created</option>
          </select>
          {errors.type && 'Type of quiz is required!'} */}

          <label htmlFor='externalLink'>Link to Quiz*</label>
          <input type="text" name="externalLink" ref={register({ required: true })} />
          {errors.externalLink && 'A link to an external quiz is required in order for students to assess this playlist.'}

          <button type='submit'>Save Quiz</button>
        </form>
      </FormWrapper>
    </PagePadding>
  );
};

CreateQuizForm.propTypes = {
  playlistId: PropTypes.string.isRequired,
}

export default CreateQuizForm;