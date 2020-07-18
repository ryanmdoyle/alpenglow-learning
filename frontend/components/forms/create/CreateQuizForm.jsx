import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import FormWrapper from '../../styled/blocks/FormWrapper';
import PagePadding from '../../styled/PagePadding';
import AlertContext from '../../context/AlertContext';
import ModalContext from '../../context/ModalContext';
import { GET_QUIZ_FOR_PLAYLIST } from '../../../gql/queries';

const CREATE_QUIZ = gql`
  mutation CREATE_QUIZ(
    $playlistId: ID!,
    $type: String!,
    $externalLink: String!,
    $possibleScore: Int,
  ) {
    createQuiz(
      playlistId: $playlistId,
      type: $type,
      externalLink: $externalLink,
      possibleScore: $possibleScore,
    ) {
      _id
    }
  }
`;

const CreateQuizForm = ({ playlistId }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const alert = useContext(AlertContext)
  const modal = useContext(ModalContext);

  const [createQuiz, { data }] = useMutation(CREATE_QUIZ, {
    refetchQueries: [{ query: GET_QUIZ_FOR_PLAYLIST, variables: { playlistId: playlistId } }],
    onCompleted: data => {
      reset();
      modal.close();
      alert.success(`Successfully created quiz!`, 10);
    },
    onError: (error) => {
      alert.error('Sorry, there was a problem creating the quiz.');
    }
  });

  const onSubmit = data => {
    const possibleScore = data.possibleScore == '' ? null : parseInt(data.possibleScore);
    createQuiz({
      variables: {
        playlistId: playlistId,
        type: data.type || "EXTERNAL",
        externalLink: data.externalLink,
        possibleScore: possibleScore,
      }
    })
  };

  // if (courseQuery.loading) return <Loading />;
  return (
    <PagePadding>
      <h4>Create Quiz</h4>
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

          <label htmlFor='possibleScore'>Possible Score (Highest Points Possible)</label>
          <small><em>If needed, you can change this when you enter a students final score.</em></small>
          <input type='number' name='possibleScore' ref={register()} />
          {errors.possibleScore && 'The possible score must be a interger value.'}

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